import express from 'express'
import cors from 'cors'
import { Routes } from './routes/index'
import AppConfig from './configs/config'
import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/', Routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.listen(AppConfig.PORT, () => {
    console.log(`Application running at: http://localhost:${AppConfig.PORT}`)
    console.log(`Health check: http://localhost:${AppConfig.PORT}/health`)
})
