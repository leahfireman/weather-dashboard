const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index').default;

const app = express();

// Middleware setup
app.use(bodyParser.json()); // Parsing JSON bodies

// Route setup
app.use('/api', indexRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;

