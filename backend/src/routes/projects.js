const express = require('express');
const { supabase } = require('../config/supabase');
const { asyncHandler } = require('../utils/asyncHandler');
const router = express.Router();

// GET /api/projects - list all projects (with client name resolved)
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*');

    if (projectsError) throw { status: 500, message: projectsError.message };

    const { data: clients, error: clientsError } = await supabase
      .from('clients')
      .select('*');

    if (clientsError) throw { status: 500, message: clientsError.message };

    const clientNameById = Object.fromEntries(
      (clients || []).map((c) => [c.id, c.name])
    );

    const projectsWithClient = (projects || []).map((p) => ({
      ...p,
      client: p.client_id ? clientNameById[p.client_id] || null : null,
    }));

    return res.json({ projects: projectsWithClient });
  })
);

// GET /api/projects/:code - get a single project by code (e.g. PRJ-001)
router.get(
  '/:code',
  asyncHandler(async (req, res) => {
    const { code } = req.params;
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('code', code)
      .maybeSingle();

    if (error) throw { status: 500, message: error.message };
    if (!data) throw { status: 404, message: `Project ${code} not found` };
    return res.json({ project: data });
  })
);

// POST /api/projects - create a new project (manager action)
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { code, name, client, manager, status, progress, dueDate, budget, health } =
      req.body || {};

    if (!name) throw { status: 400, message: 'Project name is required' };

    let clientId = null;
    if (client) {
      const { data: existingClient, error: clientError } = await supabase
        .from('clients')
        .select('id')
        .eq('name', client)
        .maybeSingle();

      if (clientError) throw { status: 500, message: clientError.message };
      clientId = existingClient?.id || null;
    }

    const { data: existingProjects } = await supabase.from('projects').select('code');
    const nextNum = (existingProjects?.length || 0) + 1;
    const resolvedCode = code || `PRJ-${String(nextNum).padStart(3, '0')}`;

    const { data, error } = await supabase
      .from('projects')
      .insert({
        code: resolvedCode,
        name,
        client_id: clientId,
        manager: manager || null,
        status: status || 'Planning',
        progress: progress || 0,
        due_date: dueDate || null,
        budget: budget || 0,
        health: health || 'Healthy',
      })
      .select()
      .single();

    if (error) throw { status: 500, message: error.message };
    return res.status(201).json({ project: data });
  })
);

// PUT /api/projects/:code - update a project
router.put(
  '/:code',
  asyncHandler(async (req, res) => {
    const { code } = req.params;
    const { name, manager, status, progress, dueDate, budget, health } = req.body || {};

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (manager !== undefined) updates.manager = manager;
    if (status !== undefined) updates.status = status;
    if (progress !== undefined) updates.progress = progress;
    if (dueDate !== undefined) updates.due_date = dueDate;
    if (budget !== undefined) updates.budget = budget;
    if (health !== undefined) updates.health = health;

    if (Object.keys(updates).length === 0) {
      throw { status: 400, message: 'No valid fields provided to update' };
    }

    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('code', code)
      .select()
      .single();

    if (error) throw { status: 500, message: error.message };
    if (!data) throw { status: 404, message: `Project ${code} not found` };
    return res.json({ project: data });
  })
);

// DELETE /api/projects/:code - delete a project
router.delete(
  '/:code',
  asyncHandler(async (req, res) => {
    const { code } = req.params;
    const { data, error } = await supabase
      .from('projects')
      .delete()
      .eq('code', code)
      .select()
      .single();

    if (error) throw { status: 500, message: error.message };
    if (!data) throw { status: 404, message: `Project ${code} not found` };
    return res.json({ deleted: true });
  })
);

module.exports = router;
