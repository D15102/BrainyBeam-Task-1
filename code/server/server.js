import app from './routes/app.js'
import connectDB from './config/mongodb.config.js'

app.listen(3000, () => {
    connectDB()
    console.log(`Server is Running on http://localhost:3000`)
})