import React,{useState} from 'react'
import {Comment, Avatar, Button, Input} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import axios from 'axios'
import {useSelector} from 'react-redux'
import Like from './Like'
import {CommentTypes} from '../DetailPage'

interface SingleCommentProps{
    CommentLists: CommentTypes[],
    postId: string,
    refreshFunction(newComment:CommentTypes): void,
    comment: {_id: string, writer:{name:string,image:string}, content:string},
    userId: string
}

function SingleComment({CommentLists, postId, refreshFunction, comment, userId}:SingleCommentProps) {

    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState<boolean>(false)
    const user = useSelector(state=>state.user)

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () =>{
        setOpenReply(!OpenReply)
    }

    const action = [
        <Like style={{height:'1px'}} comment boardId = {postId} commentId={comment._id} userId={userId}/>,
        <span onClick={openReply} key = "comment-basic-reply-to">Reply to</span>
    ]

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) =>{//답글저장부분
        if(CommentValue === ""){
            alert("댓글을 입력하십시오")
        }
        else{
            e.preventDefault()

            const variables = {
                writer: user.userData._id,
                postId: postId,
                responseTo: comment._id,
                content: CommentValue
            }
            axios.post('/api/comment/saveComment',variables)
            .then(response=>{
                if(response.data.success){
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    refreshFunction(response.data.result)
                }else{
                    alert('댓글 저장에 실패했습니다')
                }
            })
        }

    }

    return (
        <div>
            <Comment
                actions={action}
                author={comment.writer.name}
                avatar={
                    <Avatar
                        src={comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {comment.content}
                    </p>
                }
            ></Comment>
        {OpenReply && 
                    <form style={{display: 'flex'}} onSubmit = {onSubmit}>
                    <TextArea
                        style={{width: '100%', borderRadius:'5px'}}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write some somments"
                    />
                    <br />
                    <Button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</Button>
                </form>
        }
        </div>
    )
}

export default SingleComment
