import React,{useState} from 'react'
import {Button, Input} from 'antd'
import axios from 'axios'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'
import {useSelector} from 'react-redux'
import { CommentTypes } from '../DetailPage'

const {TextArea} = Input

interface RootState {
    user: {userData: {_id: string }}
}

interface CommentProps {
    CommentLists: CommentTypes[],
    postId: string
    refreshFunction(newComment:CommentTypes): void
}


function Comments({CommentLists, postId, refreshFunction}: CommentProps) {

    const user = useSelector((state:RootState)=> state.user)
    const [Comment, setComment] = useState<string>("")

    const handleChange:React.ChangeEventHandler<HTMLTextAreaElement> = (e) =>{
        setComment(e.currentTarget.value)
    }

    const onSubmit:React.MouseEventHandler<HTMLElement> = (e) => {
        if(Comment === ""){
            alert("댓글을 입력하십시오")
        }
        else{
            e.preventDefault();
            const variables = {
                content: Comment,
                writer: user.userData._id,
                postId: postId
            }
            axios.post('/api/comment/saveComment', variables)
            .then(response=>{
                if(response.data.success){
                    setComment("")
                    refreshFunction(response.data.result)
                }else{
                    alert('댓글저장에 실패했습니다')
                }
            })
        }

    }

    return (
        <div>
            <br />
            <p>Comments</p>
            <hr/>
            {/*Comment Lists*/}
            {CommentLists && CommentLists.map((comment, index:number)=>(
                (!comment.responseTo &&                 
                <React.Fragment>
                    <SingleComment comment = {comment} postId={postId} userId={user.userData._id} refreshFunction={refreshFunction}/>
                    <ReplyComment CommentLists={CommentLists} postId={postId} parentCommentId={comment._id} refreshFunction={refreshFunction}/>
                </React.Fragment>)

            ))}
            {/* Root Comment Form*/}
            <form style={{display:'flex'}}>
                <TextArea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange = {handleChange}
                    value = {Comment}
                    placeholder="write some comments"
                    required= {true}
                />
            <br/>
            <Button style={{width: '100px', height:'52px'}} onClick={onSubmit}>Submit</Button>
            </form>
        </div>
    )
}

export default Comments
