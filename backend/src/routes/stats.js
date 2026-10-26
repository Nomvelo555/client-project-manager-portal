const express = require('express');
const { supabase } = require('../config/supabase');
const { asyncHandler } = require('../utils/asyncHandler');
const router = express.Router();

// GET /api/stats - aggregated dashboard stats
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

    const activeProjects = (projects || []).filter(
      (p) => p.status !== 'Completed'
    );
    const totalBudget = (projects || []).reduce(
      (sum, p) => sum + Number(p.budget || 0),
      0
    );

    return res.json({
      stats: {
        activeProjects: activeProjects.length,
        clientAccounts: (clients || []).length,
        pendingDeliverables: (projects || []).reduce(
          (sum, p) => sum + Math.max(0, 100 - Number(p.progress || 0)),
          0
        ),
        totalAllocatedBudget: totalBudget,
      },
      projects: projects || [],
      clients: clients || [],
    });
  })
);

module.exports = router;
