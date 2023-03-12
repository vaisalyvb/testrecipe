const express = require("express");
const RecipeInfo = require('./model/recipeDb');
const app = new express();
const path = require('path');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'/build')));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type ");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})
app.get('/',(req,res)=>{
    res.send("Congratulation!! Server is UP");
})
app.get('/api',(req,res)=>{
    res.json([{"r_name":"","r_duration":0,"r_num":0}]);
})
app.post('/api/create', async (req,res)=>{
    try{
        console.log(req.body);
        let recipe = new RecipeInfo(req.body);
        let result = await recipe.save();
        res.json(result);
    }
    catch(error){
        res.status(500).send(error);
    }
    
});
app.get('/api/view',async(req,res)=>{
    try{
        let result = await RecipeInfo.find();
        res.json(result);
    }
    catch(error){
        res.status(500).send(error);
    }
   
});

app.post('/api/update',async (req,res)=>{
        try{
            let result = recipeInfo.findByIdAndUpdate(req.body._id,req.body);
            res.send("Updated");
        }
        catch(error){
            res.status(500).send(error);
        }
       
    });
app.post('/api/delete',async (req,res)=>{
    try{
       let result = await RecipeInfo.findByIdAndDelete(req.body._id);
       res.json({"success":"Deleted"});
    }
    catch(error){
        res.status(500).send(error);
    }
   
});



app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname ,'/build/index.html')); }); 


app.listen(8000,()=>{
    console.log("Server is running in port 8000");
})