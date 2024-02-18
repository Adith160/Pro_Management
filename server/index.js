const express = require('express')
const db= require('./config/mongoDb')
const cors = require('cors')
const authRouter = require('./router/auth')
const taskRouter = require('./router/tasks')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth/v1', authRouter)
app.use('/tasks/v1', taskRouter)

app.get('/health', (req, res) => {
  res.json({service:"Pro Manage",
            status: "Active",
            time: new Date(),})
})    

// Catch-all middleware for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', success: false });
});


const port = process.env.port||8000;
app.listen(port, () => {
    console.log("Server Started Successfully!!!!", port)
})