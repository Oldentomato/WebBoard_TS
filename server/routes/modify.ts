import express,{Request, Response} from 'express'
const router = express.Router()
const {Board} = require("../models/Board")
import fs from 'fs'

// const {auth} = require("../middleware/auth")

router.post('/getContent',(req:Request,res:Response)=>{
    Board.findByIdAndUpdate({_id: req.body.postId},{
        title: req.body.title,
        content: req.body.content
    },
        (err,result)=>{
            if(err)return res.json({success:false, err})
            return res.status(200).send({
                success:true
            })
        })
})

router.post('/deleteContent',(req:Request,res:Response)=>{
    fs.unlink(req.body.FilePath,(err)=>{
        if(err){
            console.log("파일 삭제 Error 발생")
        }
        Board.findOneAndDelete({_id:req.body.BoardId},(err) =>{
            if(err) return res.json({success: false, err})
            return res.status(200).json({success: true})
        })
    })


})

router.post('/deleteImg',(req:Request,res:Response)=>{
    fs.unlink(req.body.FilePath,(err)=>{
        if(err){
            console.log("사진 삭제 Error")
        }
        return res.status(200).json({success: true})
    })
})

module.exports = router;