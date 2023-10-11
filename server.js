 const express = require('express');
 const cors = require('cors');
 const app = express();
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 
 const port = 3000;
 app.use(express.json());
 app.use(cors()); 

 const budgetSchema = new Schema({
  title: { type: String,required: true},
  relatedValue: { type: Number, required: true },
  color: { type: String, required: true,minlength: 6, match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/},
 })
 const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/nbad');
 const Budget = conn.model('Budget', budgetSchema); 

app.get('/budgets', async (req,res) => {
   let budgetList =  await Budget.find({});
   res.json( { myMonthlyBudget: budgetList})
})

app.post('/budget', async (req,res) => {
   let budgetReq = req.body
   console.log(req.body)
   try {
      let response = await Budget.create({ title: budgetReq.title, relatedValue: budgetReq.relatedValue, color: budgetReq.color });
      res.status(200).send(response.title +  " created successfully")
   } catch (e) {
      res.status(400).send(e.message)
   }
  
})
 
 app.listen(port, () =>{
    console.log(` API Served at http://localhost:${port}`)
 });
