const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "Waffles_the_secret_key",
    mongoUri: process.env.MONGODB_URI ||
        "mongodb+srv://krisoud_comp229_2:bPfAg61m7Guw3VGL@cluster0.qyv4gyb.mongodb.net/?retryWrites=true&w=majority" ||
        process.env.MONGO_HOST ||
        'mongodb://' + (process.env.IP || '127.0.0.1') + ':' +
        (process.env.MONGO_PORT || '27017') +
        '/skeleton'
}

export default config   