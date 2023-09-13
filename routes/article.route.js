var express=require('express');
var router=express.Router();
const Article=require('../models/article');
const Scategorie=require('../models/scategorie');
const {verifyToken} =require("../Middleware/verifytoken")
const {authorizeRoles} =require("../Middleware/authorizeRoles")

router.get('/',verifyToken,authorizeRoles("admin","user"),async(req,res)=>{
    try{
    const art=await Article.find().populate("scategorieID").exec();
    res.status(200).json(art);
    }catch(error){
        res.status(404).json({message:error.message});
    }
})

router.post('/',async(req,res)=>{
    const newArticle=new Article(req.body);
    try{
        await newArticle.save();
        res.status(200).json(newArticle);
    }catch(error){
        res.status(404).json({message:error.message});
    }
})

router.get('/:articleID',async(req,res)=>{
    try{
        const art=await Article.findById(req.params.articleID).populate("scategorieID").exec();
        res.status(200).json(art);
    }catch(error){
        res.status(404).json({message:error.message});
    }
})

router.put('/:articleID',async(req,res)=>{
    try{
        const art=await Article.findByIdAndUpdate(req.params.articleID,{$set:req.body})
        res.status(200).json(art);
    }catch(error){
        res.status(404).json({message:error.message});
    }
})

router.delete('/:articleID',async(req,res)=>{
    await Article.findByIdAndDelete(req.params.articleID);
    res.json({message:"article supprimer avec success!"});
})

module.exports = router;