const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        const godwin = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected: Host:${godwin.connection.host}, ${godwin.connection.name}`)
    } catch (error) {
        console.log(error.message)
    }

}

module.exports = connectDB