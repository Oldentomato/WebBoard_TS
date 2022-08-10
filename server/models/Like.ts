import {Schema, model, Types} from 'mongoose';

interface ILike{
    userId: Types.ObjectId,
    commentId: Types.ObjectId,
    boardId: Types.ObjectId
}

const likeSchema: Schema<ILike> = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId:{
        type: Schema.Types.ObjectId,
        ref:'Comment'
    },
    boardId:{
        type: Schema.Types.ObjectId,
        ref:'Board'
    }
},{timestamps: true})

const Like = model<ILike>('Like',likeSchema)

export {Like, ILike};