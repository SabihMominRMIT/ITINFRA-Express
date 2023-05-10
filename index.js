const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');
const User = require('./models/user.model');

async function connectDb() {
  try {
    const con = await mongoose.connect('mongodb://127.0.0.1:27017/itnfra-db');
    console.log(`mongo db connected ${con.connection.host}`);
  } catch (err) {
    console.log(err);
  }
}
connectDb();

app.post('/api/register', async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    res.json({ status: 'ok' });
  } catch (err) {
    console.log(err);
    res.send({ status: 'error', error: 'duplicate email' });
  }
});

app.post('/api/login', async (req, res) => {
    const user=await User.findOne({
        email:req.body.email,
        password:req.body.password
    })

    if(user){
        return res.json({status:'ok',user:true})
    }
    else{
        return res.json({status:'error',user:false})
    }
  });

app.listen(5000, () => {
  console.log('server started on 5000');
});
