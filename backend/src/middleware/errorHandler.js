function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-unused-vars
  const status = err.status || 500;
  console.error('[backend] error:', err.message || err);
  res.status(status).json({ error: err.message || 'Internal Server Error' });
}

module.exports = { errorHandler };
