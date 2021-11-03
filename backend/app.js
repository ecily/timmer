const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config({ path: 'backend/config/config.env'})

//11.10. versuch mit multer
const multer = require('multer');

//const fileUpload = require('express-fileupload')
const path = require('path')
const errorMiddleware = require('./middlewares/errors')

// Setting up config file
if(process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

//11.10. auskommentieren vorher
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//19.10.21 express-fileupload for cloudinary
//app.use(fileUpload)

//11.10. versuch mit multer
var forms = multer({
    limits: {
        fieldSize: 25 * 1024 *1024
    }
});
app.use(bodyParser.json());
app.use(forms.array());
app.use(bodyParser.urlencoded({ extended: true }));

// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');

app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', payment)
app.use('/api/v1', order)

if (process.env.NODE_ENV === "PRODUCTION") {
    const root = require("path").join(__dirname, "../frontend", "build");
    app.use(express.static(root));
   
    app.get("*", (req, res) => {
      res.sendFile("index.html", { root });
    });
  }

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app