import { Types } from "mongoose";

// comment.interface.ts
export type TCommentModel = {
  roadmapId: Types.ObjectId;
  userId: Types.ObjectId;
  content: string;
  parentCommentId?: Types.ObjectId | null;
  depth: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TComment = {
  _id: string;
  roadmapId: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  content: string;
  parentCommentId?: string;
  depth: number;
  createdAt?: string;
  updatedAt?: string;
  replies?: TComment[];
};
