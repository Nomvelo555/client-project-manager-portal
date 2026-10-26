const express = require('express');
const { supabase } = require('../config/supabase');
const { asyncHandler } = require('../utils/asyncHandler');
const router = express.Router();

// GET /api/clients - list all clients
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase.from('clients').select('*');
    if (error) throw { status: 500, message: error.message };
    return res.json({ clients: data || [] });
  })
);

module.exports = router;
