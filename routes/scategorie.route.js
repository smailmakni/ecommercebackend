var express = require('express');
const Categorie=require("../models/categorie.js");
const Scategorie = require('../models/scategorie.js');
var router = express.Router();
router.get('/',async(req,res)=> {
    try{
        const scat= await Scategorie.find().populate("categorieID").exec();
        res.status(200).json(scat);
    } catch(error){
        res.status(404).json({message : error.message});
    }
})

router.post('/',async(req,res)=> {
    const {nomscategorie,imagescat,categorieID}=req.body;
    const newScat=new Scategorie(req.body);
    try{
        await newScat.save();
        res.status(200).json(newScat);
    } catch(error){
      res.status(404).json({message : error.message})  
    }
})
router.get('/:scategorieID',async(req,res)=>{
    const id=req.params.scategorieID;
    try{
        const scat= await Scategorie.findById(req.params.scategorieID).populate("categorieID").exec();
        res.status(200).json(scat);
    }catch(error){
        res.status(404).json({message:error.message});
    }
})

router.put('/:scategorieID',async(req,res)=>{
    try{
        const scat=await Scategorie.findByIdAndUpdate(req.params.scategorieID,{$set:req.body});
        res.status(200).json(scat);
    }catch(error){
        res.status(404).json({message:error.message});
    }
})

router.delete('/:scategorieID',async(req,res)=>{
    const id=req.params.scategorieID;
    await Scategorie.findByIdAndDelete(id);
    res.json({message:"sous categorie supprimer avec succes!"});
})
module.exports = router;