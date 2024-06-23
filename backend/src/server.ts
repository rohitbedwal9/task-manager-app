import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import TasksSchema from './models/task'

const app = express()
app.use(express.json())
app.use(cors())
const url = "mongodb+srv://rohitbedwal9:1@cluster0.wjj0mer.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.get('/api/tasks', async (_, res) => {
  try {
      const tasks = await TasksSchema.find()
      res.status(200).json({ tasks })
  } catch (error) {
      console.log('Error getting tasks: ', error)
      res.status(500).json({ error: error})
  }
})


app.post('/api/tasks', async (req, res) => {
  try {
      const task = await TasksSchema.create(req.body)
      await task.save()
      res.status(201).json({ task })
  } catch (error) {
      console.log('Error creating task: ', error)
      res.status(500).json({ error: error })
  }
})

app.put('/api/tasks/:id', async (req, res) => {
  try {
      const { id } = req.params
      const task = await TasksSchema.findByIdAndUpdate
      (id
          , req.body
          , { new: true }
      )
      res.status(200).json({ task })
  } catch (error) {
      console.log('Error updating task: ', error)
      res.status(500).json({ error: error })
  }
})

app.delete('/api/tasks/:id', async (req, res) => {
  try {
      const { id } = req.params
      await TasksSchema.findByIdAndDelete(id)
      res.status(204).send()
  } catch (error) {
      console.log('Error deleting task: ', error)
      res.status(500).json({ error: error })
  }
})

app.listen(5000, () => {
  mongoose.connect(url)
      .then(() => console.log("mongoDB is connected"))
      .catch((e) => console.log(e.message))

  console.log("express is working at localhost:5000")
})