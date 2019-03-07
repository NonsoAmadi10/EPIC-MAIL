import express from 'express';
import userRoutes from './routes/user.route';


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use('/api/v1', userRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to epic mail',
  });
});

app.listen(port, console.log('App is running'));

export default app;
