import express from 'express';
import dotenv from 'dotenv';
import '@babel/polyfill';
import userRoutes from './routes/user.route';
import messageRouter from './routes/message.route';
import userRoutesV2 from './v2/routes/user.route';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;



app.use(express.json());
app.use('/api/v1', userRoutes);
app.use('/api/v1/', messageRouter);

app.use('/api/v2/auth', userRoutesV2);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to epic mail',
  });
});

app.listen(port, console.log('App is running'));

export default app;
