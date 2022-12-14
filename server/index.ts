import express,{Application} from 'express'
const app:Application = express()
const port = 5000
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
//const config = require("./server/config/key.js")//개발용
const config = require("./config/key.ts")//배포용
import cors from 'cors'
const mongoose = require('mongoose');


//카카오api 를 허용하기위한 cors
const options={
  origin: 'http://dapi.kakao.com/v2/maps/sdk.js',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(options))

//application/x-www-form-unlencoded 정보를 받아주기 위함
app.use(bodyParser.urlencoded({extended: true}))
//application/json 정보를 받아주기 위함
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/users', require('./routes/users'))
app.use('/api/board', require('./routes/uploads'))
app.use('/api/comment',require('./routes/comment'))
app.use('/api/like', require('./routes/like'))
app.use('/api/modify', require('./routes/modify'))
app.use('/uploads', express.static('uploads'))





// const { createTrue } = require('typescript')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=> console.log('MongoDB Connected...'))
  .catch(err=> console.log(err))



  //아마 빌드 시에 필요한 코드인것 같다
//   if(process.env.NODE_ENV === "production"){
//     app.use(express.static("client/build"))

//     app.get("*", (req,res)=>{//개발용은 ../client
//       res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"))
//     })
//   }



app.listen(port,() => console.log(`Polaroid app listening on port ${port}!`))