const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();app.use(cors());app.use(bodyParser.json({limit:'10mb'}));
let products=[];for(let i=1;i<=15;i++)products.push({id:i,title:`Product ${i}`,image:`https://via.placeholder.com/400x300.png?text=Frame+${i}`,description:'Demo',booked:false});
app.get('/api/products',(req,res)=>res.json(products));
const PORT=process.env.PORT||4000;app.listen(PORT,()=>console.log('Backend running',PORT));
