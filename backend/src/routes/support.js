const express = require('express');
const { supabase } = require('../config/supabase');
const { asyncHandler } = require('../utils/asyncHandler');
const router = express.Router();

// POST /api/support - submit a support message / feedback (client <-> manager)
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { projectCode, sender, senderRole, message } = req.body || {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      throw { status: 400, message: 'Message is required' };
    }

    const { data, error } = await supabase
      .from('support_tickets')
      .insert({
        project_code: projectCode || null,
        sender: sender || 'Client',
        sender_role: senderRole || 'client',
        message: message.trim(),
      })
      .select()
      .single();

    if (error) throw { status: 500, message: error.message };
    return res.status(201).json({ ticket: data });
  })
);

// GET /api/support - list support tickets / messages (optionally filtered by projectCode)
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { projectCode } = req.query;

    let query = supabase
      .from('support_tickets')
      .select('*')
      .order('created_at', { ascending: false });

    if (projectCode) query = query.eq('project_code', projectCode);

    const { data, error } = await query;
    if (error) throw { status: 500, message: error.message };
    return res.json({ tickets: data || [] });
  })
);

module.exports = router;
