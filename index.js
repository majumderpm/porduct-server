const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const cors = require('cors')
const path = require("path");

const app = express()
require("dotenv").config()
const port = process.env.PORT || 6000
const loginRoute = require('./v1/routes/loginRoute')
// const serviceRoute = require('./v1/routes/serviceRoute')
// const reviewRoute = require('./v1/routes/reviewRoute')
const categoryRoute = require('./v1/routes/category.route')
const productRoute = require('./v1/routes/product.route')
const userRoute = require('./v1/routes/user.route')

app.use(cors())


const connetToDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://resale-market:9FS3yfrDwolrpHMK@cluster0.3nz93gn.mongodb.net/resale-market?retryWrites=true&w=majority');
        console.log("coonented to db")
    } catch (error) {
        console.log(error);
    }
}
app.use(express.json())









app.use(express.static("images"));


app.use(express.static(path.join(__dirname, 'images')));
const storage = multer.diskStorage({
    destination: "images/",
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname.toLowerCase()?.split(" ")?.join("-"));

    },
});

const upload = multer({ storage: storage })
app.post('/profile', upload.single('avatar'), function (req, res, next) {
    console.log("first")
    if (!req.file) {
        res.send | ({ code: 500, msg: 'error' })
    } else {

        const result = (req.file)
        res.send({ code: 200, msg: "upload successfully", result })
    }
})

app.use("/api/v1/token", loginRoute)
// app.use("/api/v1/service", serviceRoute)
// app.use("/api/v1/review", reviewRoute)
app.use("/api/v1/category", categoryRoute)
app.use("/api/v1/product", productRoute)
app.use("/api/v1/user", userRoute)


app.listen(port, () => {
    connetToDb()
    console.log(`Example app listening on port ${port}`)
})