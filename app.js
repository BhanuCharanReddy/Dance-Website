const express=require('express');
const path=require('path');
const app=express();
const fs=require('fs');
const port=80;
//const bodyparser=require('body-parser');


//STARTING MONGODB
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost/contact');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//SCHEMA
var contactSchema = new mongoose.Schema({
    name:String,
    phone:Number,
    email:String,
    address:String,
    concern:String                                        //INPUT AND INPUT TYPE
});

//MODEL
var contact = mongoose.model('contact',contactSchema);

//STATIC FILES
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//PUG CODE
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//ENDPOINTS
//ENDPOINT FOR HOME PAGE
app.get('/',(req,res)=>{
   // const params={'title':'Dance Academy','Message':'Welcome to Dance Academy'};
    res.status(200).render('home.pug');
});
//ENDPOINT FOR CONTACT PAGE
app.get('/contact',(req,res)=>{
    //const params={'title':'Dance Academy','Message':'Welcome to Dance Academy'};
    res.status(200).render('contact.pug');
});

//APP POSTING FOR DATABASE
app.post('/contact',(req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("Success")
    }).catch(()=>{
        res.status(400).send("Item was not saved")

    });
    //res.status(200).render('contact.pug');
})



//STARTING SERVER
app.listen(port,()=>{
    console.log(`${port}`);
})
