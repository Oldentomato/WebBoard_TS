import {model, Types, Schema} from "mongoose";

interface IFile {
    _id: string,
    filepath: string,
    title: string,
    content: string,
    views: number,
    latitude: number,
    longitude: number,
    createdAt: string,
    writer: Types.ObjectId 
}



const boardSchema: Schema<IFile> = new Schema({
    writer:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    filepath:{
        type: String,
        maxlength: 200
    },
    title:{
        type: String,
        maxlength: 50
    },
    content:{
        type: String,
        maxlength: 100
    },
    views:{
        type: Number,
        default: 0
    },
    latitude:{
        type: Number
    },
    longitude:{
        type: Number
    }
},{timestamps: true})




const Board = model<IFile>('Board',boardSchema)

export {Board, IFile};