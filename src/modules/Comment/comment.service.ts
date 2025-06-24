import { Types } from "mongoose";
import AppError from "../../app/errors/AppError";
import { Comment } from "./comment.model";
import status from "http-status";

const createComment = async(data:{
    roadmapId:string;
    userId:string;
    content:string;
    parentCommentId?:string
})=>{
    const { roadmapId, userId, content, parentCommentId } = data;

    let depth = 0;
    if(parentCommentId){
        const parent = await Comment.findById(parentCommentId);
        if(!parent) throw new AppError(status.NOT_FOUND,"Parent comment not found");
        depth = parent.depth + 1;
    }

    const comment = await Comment.create({
        roadmapId: new Types.ObjectId(roadmapId),
        userId: new Types.ObjectId(userId),
        content,
        parentCommentId : parentCommentId ? new Types.ObjectId(parentCommentId): null,
        depth,
    });
    return comment;
};

const getCommentsByRoadmap = async (roadmapId:string) =>{
    const comments = await Comment.find({roadmapId})
        .populate("userId","name email")
        .sort({createdAt: 1})
        .lean();

    const commentMap: Record<string,any> ={};
    const roots:any[] = [];

    comments.forEach(c => {
        c.replies = [];
        commentMap[c._id.toString()] = c;
    });

    comments.forEach( c => {
        if(c.parentCommentId){
            const parent = commentMap[c.parentCommentId.toString()];
            if(parent) parent.replies.push(c);
        } else {
            roots.push(c);
        }
    });
    return roots;
};

const updateComment = async (commentId: string, userId: string, content: string) => {
  const comment = await Comment.findById(commentId);

  if (!comment) throw new AppError(status.NOT_FOUND, "Comment not found");
  if (comment.userId.toString() !== userId) throw new AppError(status.FORBIDDEN, "Not authorized");

  comment.content = content;
  await comment.save();

  return comment;
};

const deleteComment = async (commentId: string, userId: string) => {
  const comment = await Comment.findById(commentId);

  if (!comment) throw new AppError(status.NOT_FOUND, "Comment not found");
  if (comment.userId.toString() !== userId) throw new AppError(status.FORBIDDEN, "Not authorized");

  await comment.deleteOne();

  return { message: "Comment deleted successfully" };
};

export const CommentService = {
    createComment,
    getCommentsByRoadmap,
    updateComment,
    deleteComment
}