import express,{Request, Response} from 'express'
const router = express.Router()
const multer = require('multer')
const {Board} = require("../models/Board")
const path = require('path')


const {auth} = require("../middleware/auth")



var storage = multer.diskStorage({
    destination: function(req:Request, file, cb){
      cb(null,'uploads/')
    },
    filename: function(req:Request, file, cb){
      cb(null, `${Date.now()}_${file.originalname}`)
    }

  })

  const fileFilter = function(req:Request, file, callback) {
    var ext = path.extname(file.originalname)
    
    // if(ext !=='.jpg'){
    //   return callback(res.end('only jpg allowed'),false);
    // }
    callback(null,true)
  }

  
  var upload = multer({
    storage: storage,
    fileFilter: fileFilter
  }).single("file")



  router.post("/uploadfiles",(req:Request,res:Response)=>{
      upload(req,res, err =>{
          if(err){
              return res.json({ success: false, err})
          }else{
              res.json({success: true, filePath: res.req.body.file.path, fileName: res.req.body.file.filename})
          }
      })
  
})


  
router.post("/uploadinfo",(req:Request,res:Response)=>{
    const board = new Board(req.body)

    board.save((err:Boolean, board:object)=>{
        if(err)return res.status(400).json({success: false, err})
        return res.status(200).json({ success: true})
    })
  
})

router.get("/getimages",(req:Request,res:Response)=>{
  Board.find()
  .populate('writer')
  .exec((err:Boolean,board:object)=>{
    if(err)return res.status(400).send(err);
    res.status(200).json({success:true, board})
  })
})

router.post("/getuserimages",(req:Request,res:Response)=>{
  Board.find({writer: req.body.writer},(err:Boolean,board:object)=>{
    if(err) return res.json({success:false, err})
    return res.status(200).json({success:true, board})
  })
})

router.post("/",(req:Request,res:Response)=>{
  Board.find({writer: req.body.writer},(err:Boolean,board:object)=>{
    if(err) return res.json({success:false, err})
    return res.status(200).json({success:true, board})
  })
})

router.post("/getimage",(req:Request,res:Response)=>{
  Board.findOneAndUpdate({_id: req.body.BoardId},
  {views: req.body.Views})
  .populate('writer')
  .exec((err:Boolean,board:object)=>{
    if(err)return res.status(400).send(err);
    res.status(200).json({success:true, board})
  })
})


module.exports = router
  