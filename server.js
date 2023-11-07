import mongoose from "mongoose"
import config from "./config/config.js"
import app from "./server/express.js"

mongoose.Promise = global.Promise

mongoose.connect(config.mongoUri, {
    dbName: 'lore', 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log(`Connected to database: ${config.mongoUri}`)
})

mongoose.connection.on('error', (error) => {
    console.log(error)
    throw new Error(`unable to connect to database: ${config.mongoUri}`)
})


app.get("/", (req,res) => {
    res.json({ message: "Welcome to the Marketplace." })
})

app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.info(`Server started on port ${config.port}`)
})