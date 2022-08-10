import {Schema, model, Types} from 'mongoose'

interface IComment{
    writer: Types.ObjectId,
    postId: Types.ObjectId,
    responseTo: Types.ObjectId,
    content: string
}

const commentSchema: Schema<IComment> = new Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId:{
        type: Schema.Types.ObjectId,
        ref: 'Board'
    },
    responseTo:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content:{
        type: String
    }
},{ timestamps: true})

const Comment = model<IComment>('Comment', commentSchema)

export {Comment, IComment}