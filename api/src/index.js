import express from 'express';

const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to epic mail',
  });
});

app.listen(port, console.log('App is running'));

export default app;
