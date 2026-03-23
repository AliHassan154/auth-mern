const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const connectDB  = require('./Models/db.js');


const app = express();

app.use(express.json());
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: 'http://localhost:3000' // your frontend URL
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

connectDB();

app.use('/api/auth', require('./Routes/AuthRoute.js'));
app.use('/api/product', require('./Routes/ProductRouter.js'));


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})
