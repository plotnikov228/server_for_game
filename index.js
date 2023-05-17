import express from 'express'
import userRoutes from './routes/user_routes.js'
import playerRoutes from './routes/player_routes.js'

import mongoose from "mongoose"

const PORT = process.env.PORT || 80
const DB_URL = "mongodb+srv://user:user@cluster.rqpahoy.mongodb.net/?retryWrites=true&w=majority"

const app = express();

app.use(express.json())
app.use('/user', userRoutes)
app.use('/player', playerRoutes)


async function startApp () {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log('SERVER IS WORKING ON ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp()

export default app


