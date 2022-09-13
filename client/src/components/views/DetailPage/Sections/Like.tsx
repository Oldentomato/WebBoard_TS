import React,{useEffect, useState} from 'react'
import {Tooltip} from 'antd'
import axios from 'axios'
import BtnStyle from '../../../../css/LikeBtn.css'

interface LikeProps {
    comment: string | boolean,
    commentId: string,
    boardId: string,
    userId: string,
    board: boolean
}

function Like(props: LikeProps) {

    const [Likes, setLikes] = useState<number>(0)
    const [LikeAction, setLikeAction] = useState<string>("")
    let variable = {}

    if(props.comment){
        variable = {boardId: props.boardId, commentId: props.commentId, userId:props.userId}
    }else{
        variable = {boardId: props.boardId, userId:props.userId}
    }

    const onLike = () =>{
        if(LikeAction === "notchecked"){
            axios.post('/api/like/upLike', variable)
            .then(response=>{
                if(response.data.success){
                    setLikes(Likes + 1)
                    setLikeAction('checked')
                }else{
                    alert('추천수 업데이트에 문제가 발생했습니다')
                }
            })
        }else{
            axios.post('/api/like/unLike', variable)
            .then(response=>{
                if(response.data.success){
                    setLikeAction("notchecked")
                    setLikes(Likes - 1)
                }else{
                    alert('추천수 업데이트에 문제가 발생했습니다')
                }
            })
        }
    }

    useEffect(()=>{
        axios.post('/api/like/getLikes', variable)
        .then(response=>{
            if(response.data.success){
                setLikes(response.data.likes.length)
                response.data.likes.map((like:{userId:string}) => {
                    
                    if(like.userId === props.userId){
                        setLikeAction('checked')
                    }
                })
            }else{
                alert('추천수를 가져오는데 문제가 발생했습니다')
            }
        })
    },[])

    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title={(props.board)?' Recommend!':' Like!'}>
                    {LikeAction==='checked'?<input className={props.board?"RecommendBtn":"LikeBtn"}  type="checkbox" style={BtnStyle} checked={true} onClick={onLike}/>:
                    <input className={props.board?"RecommendBtn":"LikeBtn"} type="checkbox" style={BtnStyle} onClick={onLike}/>}
                     
                </Tooltip>
                <span style={(props.board)?{position:'relative',paddingLeft:'29vw', cursor:'auto'}:{paddingLeft:'8px', cursor:'auto'}}>{Likes}{(props.board)?' Recommended':' like'}</span>
            </span>&nbsp;&nbsp;
            
        </React.Fragment>
    )
}

export default Like
