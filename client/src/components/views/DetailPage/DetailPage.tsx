import React,{useEffect, useState} from 'react'
import {List, Avatar} from 'antd'
import axios from 'axios'
import Comment from './Sections/Comments'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faWindowClose} from '@fortawesome/free-regular-svg-icons'
import moment from 'moment'
import Like from './Sections/Like'
import {Link} from 'react-router-dom'
import { RouteComponentProps, useLocation } from 'react-router-dom';
import Loading from '../LoadingScene/Loading'
import {useSelector} from 'react-redux'


const {kakao}:any = window;

type ResultArr ={
    address_name: string
}

interface stateType {
    views: number,
    isGPS: boolean
}

interface FileType {
    _id: string,
    content: string,
    title: string,
    filepath: string,
    writer: {_id: string, image: string, name:string},
    createdAt: string
}

interface RootState {
    user: {userData: {_id: string}},
}

export interface CommentTypes {
    _id: string,
    content: string,
    writer: {_id: string, image: string, name: string},
    postId: string,
    responseTo: string,
}


function DetailPage (props:RouteComponentProps<{BoardId?: string}>) {

    const location = useLocation<stateType>();

    const BoardId = props.match.params.BoardId //App.js에 있는 :fileId를 참조
    const [File, setFile] = useState<FileType>({_id: "", content:"",title:"",
                                                filepath:"", writer:{_id:"",image:"",name:""}, createdAt:""})
    const [CommentLists, setCommentLists] = useState<CommentTypes[]>([])
    const [OpenMap, setOpenMap] = useState(true)
    const [Region, setRegion] = useState("")
    const Views = location.state.views
    const isGPS = location.state.isGPS
    const user = useSelector((state:RootState) => state.user)


    const fileVariable = {
        BoardId : BoardId,
        Views : Views
    }

    const SetMap = (lat:number, lon:number) =>{
        var container = document.getElementById("map");
        var geocoder = new kakao.maps.services.Geocoder();
        geocoder.coord2RegionCode(lon,lat,(result:Array<ResultArr>,status:boolean)=>{
            if(status === kakao.maps.services.Status.OK){
                setRegion(result[0].address_name)
            }
        })
        var options = {
            
            center: new kakao.maps.LatLng(lat, lon),
            level: 3
        };
        var map = new kakao.maps.Map(container, options);
        var markerPosition  = new kakao.maps.LatLng(lat, lon); 
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);
        setOpenMap(false);
    }

    const openMap = () =>{
        setOpenMap(!OpenMap)
    }

    const BackPage = () =>{
        props.history.push('/Boards')
    }

    const updateComment = (newComment:CommentTypes) =>{
        setCommentLists(CommentLists.concat(newComment))
    }

    const CheckGPS = () => {
        if(isGPS){
            return(<div>
            <div id="map" style={{width: '40vw', height:'30vw',padding: '1vw', marginLeft:'1vw', display: OpenMap===true?'block':'none'}}></div>
            <div style={{fontSize:'20px', display: OpenMap===false?'block':'none'}}>{Region}</div>
            <button style={{border:'none', cursor:'pointer', color:'blue'}} onClick={openMap}>{OpenMap===false?'OpenMap':'CloseMap'}</button>
            </div>)
        }else{
            return(<div>NO GPS</div>)
        }
    }

    useEffect(()=>{

        axios.post('/api/board/getimage',fileVariable)
        .then(response=>{
            if(response.data.success){
                setFile(response.data.board)
                if(isGPS)
                    SetMap(response.data.board.latitude,response.data.board.longitude) 
            }else{
                alert("게시물을 가져오는데 실패했습니다")
            }
        })

        axios.post('/api/comment/getComments',fileVariable)
        .then(response=>{
            if(response.data.success){
                setCommentLists(response.data.comments)
            }else{
                alert("댓글 가져오는데 실패했습니다")
            }
        })


        
    },[])

    if(File.writer){//axios에서 File정보를 받아오는데 시간이 걸려서 File부분이 undefiended가 될때가 있는데 이것을 로딩으로 메꿔줘서 에러를 방지한다
    return (
        <div className="postPage" style={{position:'absolute',padding: '6.5vw 6.5vw',width:'100%', background: 'rgba(0,0,0,0.5)',zIndex:'20',top:'0%',overflow:'scroll',height:'100%'}}>
            <div style={{position:'relative',background:"#E6E6E6",width:'56%',padding: '3vw',marginLeft:'20%',borderRadius:'10px'}}>
            <List.Item.Meta
                    avatar={<Avatar src={File.writer && File.writer.image} />}
                    title={<a style={{ fontSize:'25px', fontWeight:'700'}}>{File.title}</a>}                
                />
                <span style={{marginLeft:'50px'}}>{moment(File.createdAt).format("MMM Do YY")}</span>
                <span style={{marginLeft:'50px'}}>writer:  <Link to={{pathname:'/User',state:{user:File.writer}}}>{File.writer.name}</Link></span>
                <button style={{position:'absolute', border:'none', background:'none',cursor:'pointer',right:'5vw',top:'4vw'}}
                 onClick={BackPage}><FontAwesomeIcon size="3x" icon={faWindowClose} /> </button>
                {(user.userData._id === File.writer._id) && <Link style={{position: 'absolute', left:'25vw'}} to={{pathname:`/Board/${BoardId}/Modify`,state:{title:File.title, content:File.content, img:File.filepath}}}>Modify</Link>}

             <br />
             <img style={{position:'absoulte', width: '40vw', height: '30vw',padding: '1vw', marginLeft:'1vw', right:'5vw'}} src={`http://localhost:5000/${File.filepath}`}></img>

            <List.Item 
                actions={[<Like board boardId={BoardId} userId={user.userData._id}/>]}
            />

             {CheckGPS()}
            
             
                <List.Item.Meta
                    description={<p style={{ fontSize:'20px'}}>{File.content}</p>}
                />
                
             
             <Comment CommentLists = {CommentLists} postId={File._id} refreshFunction={updateComment}/>

            </div>

            
        </div>

    )
    }else{
        return(
            <Loading/>
        )
    }
}

export default DetailPage
