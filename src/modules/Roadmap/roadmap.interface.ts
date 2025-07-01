import { Types } from "mongoose";

export type TRoadmapStatus = 'Planned' | 'In Progress' | 'Completed';

export type TRoadmap ={
    title:string;
    description?:string;
    category?:string;
    status: TRoadmapStatus;
    upvotes?: number;
    upvotedBy?: Types.ObjectId[]; 
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IRoadmapFilters {
  status?: 'Planned' | 'In Progress' | 'Completed';
  category?: string;
}

export type TSortFields = 'createdAt' | 'upvotes';
export type TSortOrder = 'asc' | 'desc';
