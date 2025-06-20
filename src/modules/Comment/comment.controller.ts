import { Request, Response } from "express";
import { catchAsync } from "../../app/utils/catchAsync";
import { CommentService } from "./comment.service";
import sendResponse from "../../app/utils/sendResponse";
import status from "http-status";

const createComment = catchAsync(async (req:Request, res:Response) =>{
    const userId = req.user?._id;

    const { roadmapId, content, parentCommentId } = req.body;

    const comment = await CommentService.createComment({roadmapId, userId, content, parentCommentId});

    sendResponse(res, {
        statusCode: status.CREATED,
        success:true,
        message:"Comment created successfully",
        data:comment,
    });
});

const getComments = catchAsync(async (req:Request, res:Response) =>{
    const { roadmapId } = req.params;
    const comments = await CommentService.getCommentsByRoadmap(roadmapId);

    sendResponse(res, {
        statusCode:status.OK,
        success:true,
        message:"Comments retrieved successfully",
        data: comments,
    });
});

const updateComment = catchAsync( async(req:Request, res:Response) =>{
    const userId = req.user?._id;
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await CommentService.updateComment(commentId, userId, content);

    sendResponse(res, {
        statusCode: status.OK,
        success:true,
        message:"Comment updated successfully",
        data:comment
    });

});

const deleteComment = catchAsync(async (req:Request, res:Response)=>{
    const userId = req.user?._id;
    const { commentId } = req.params;

    const result = await CommentService.deleteComment(commentId, userId);

    sendResponse(res, {
        statusCode : status.OK,
        success:true,
        message:result.message,
        data:null,
    });
});

export const CommentController = {
    createComment,
    getComments,
    updateComment,
    deleteComment
}