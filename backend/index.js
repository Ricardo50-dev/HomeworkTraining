import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import UserRoutes from './routes/UserRoutes.js';
// import TrainingRoutes from './routes/TrainingRoutes.js'
// import DietRoutes from './routes/DietRoutes.js'

dotenv.config();
const app = express()

const port_server = process.env.PORT_SERVER
const port_app = process.env.PORT_APP

app.use(express.json())

app.use(cors({ credentials: true, origin: `http://localhost:${port_app}` }))

app.use(express.static('public'))

//Routes
app.use('/users', UserRoutes)
// app.use('/training', TrainingRoutes)
app.use('/diet', DietRoutes)

app.listen(port_server)