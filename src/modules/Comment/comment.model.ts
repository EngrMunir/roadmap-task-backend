import { Schema, model } from "mongoose";
import { TCommentModel } from "./comment.interface";

const commentSchema = new Schema<TCommentModel>(
  {
    roadmapId: { type: Schema.Types.ObjectId, ref: "Roadmap", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, maxlength: 300 },
    parentCommentId: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
    depth: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Comment = model<TCommentModel>("Comment", commentSchema);
