const generate = require('../models/aiModel')

const propmptGeneration = (async(req,res,next)=>{
    try{
      
        const {prompt} = req.body 
        const result = await generate(prompt);
        res.send({
          "result": result
        })
  }
  catch(err){
      res.send("error"+err)
  }
})


module.exports = { propmptGeneration };
