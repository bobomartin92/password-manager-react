import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import passwordsRoutes from './routes/routes.js'

const app = express()
dotenv.config()

app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.use('/user', passwordsRoutes);
app.use('/', (req, res) => {
    res.send('Password Manager API')
})

const PORT = process.env.PORT || process.env.LOCAL_PORT;


mongoose.connect(process.env.cloudDB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then (() => app.listen(PORT, () => console.log(`Server running at port: ${PORT}`)))
    .catch((err) => console.log(err.message));
