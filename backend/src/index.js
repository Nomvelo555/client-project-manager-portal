require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { supabase } = require('./config/supabase');
const projectRoutes = require('./routes/projects');
const clientRoutes = require('./routes/clients');
const supportRoutes = require('./routes/support');
const statsRoutes = require('./routes/stats');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());

// Health check (verifies API is up + Supabase connectivity)
app.get('/api/health', async (req, res, next) => {
  try {
    const { error } = await supabase.from('projects').select('code').limit(1);
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: error
        ? { connected: false, error: error.message }
        : { connected: true },
    });
  } catch (err) {
    next(err);
  }
});

app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/stats', statsRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not Found' }));
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Client Portal backend listening on http://localhost:${PORT}`);
});
