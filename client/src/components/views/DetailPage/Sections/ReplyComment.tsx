import React,{useState, useEffect} from 'react'
import SingleComment from './SingleComment'
import {CommentTypes} from '../DetailPage'

interface ReplyCommentProps{
    CommentLists: CommentTypes[],
    parentCommentId: string,
    postId: string,
    refreshFunction(newComment:CommentTypes): void
}

function ReplyComment({CommentLists, postId, parentCommentId,refreshFunction}:ReplyCommentProps) {
    const [OpenReplayComments, setOpenReplayComments] = useState(false)
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)

    useEffect(()=>{
        let commentNumber = 0;
        CommentLists.map((comment)=>{
            if(comment.responseTo === parentCommentId){
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    },[CommentLists, parentCommentId])

    let renderReplyComment = (parentCommentId:string) =>
         CommentLists.map((comment, index)=>(
            <React.Fragment>
                {comment.responseTo === parentCommentId && 
                    <div style={{ width: '80%',marginLeft:'50px'}}>
                    <SingleComment comment = {comment} postId={postId} refreshFunction={refreshFunction}/>
                    <ReplyComment CommentLists={CommentLists} parentCommentId={comment._id} postId={postId} refreshFunction={refreshFunction}/>
                    </div>
                    
                } 

            </React.Fragment>

        ))
    

    const handleChange = () =>{
        setOpenReplayComments(!OpenReplayComments)
    }

    return (
        <div>
            {ChildCommentNumber > 0 &&
                <p style={{fontSize:'15px', margin:0, color:'gray', cursor:'pointer'}} onClick={handleChange}>View {ChildCommentNumber} more Comment(s)</p>
            }
            
            {OpenReplayComments && 
                renderReplyComment(parentCommentId)
            }
        </div>
    )
}

export default ReplyComment
