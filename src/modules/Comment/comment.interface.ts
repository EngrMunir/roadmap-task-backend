import { Types } from "mongoose"

export type TComment ={
    roadmapId:Types.ObjectId;
    userId: Types.ObjectId;
    content:string;
    parentCommentId?:Types.ObjectId;
    depth:number;
    createdAt?:Date;
    updatedAt?:Date;
}