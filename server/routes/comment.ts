import express,{Request, Response} from 'express'
const router = express.Router()
const {Comment} = require('../models/Comment')
const { auth } = require("../middleware/auth")


router.post("/saveComment", (req:Request, res:Response) => {
    const comment = new Comment(req.body)

    comment.save((err,comment)=>{
        if(err) return res.json({success: false, err})

        Comment.find({'_id': comment._id})
        .populate('writer')
        .exec((err,result)=>{
            if(err) return res.json({success: false, err})

            return res.status(200).json({success: true, result})
        })
    })
})

router.post("/getComments", (req:Request, res:Response) => {
    Comment.find({'postId': req.body.BoardId})
    .populate('writer')
    .exec((err,comments)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success: true, comments})
    })
})

router.post("/deleteComment",(req:Request,res:Response)=>{
    Comment.deleteMany({postId: req.body.BoardId}, (err)=>{
        if(err) return res.json({success: false, err})
        return res.json({success: true})
    })
})


module.exports = router;