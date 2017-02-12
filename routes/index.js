/**
 * Created by root on 2/11/17.
 */
var express=require('express');
var router=express.Router();

router.get('/',function (req,res,next) {
    res.render('index.html');
});

module.exports=router;
