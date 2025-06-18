export type TRoadmapStatus = 'Planned' | 'In Progress' | 'Completed';

export type TRoadmap ={
    title:string;
    description?:string;
    category?:string;
    status: TRoadmapStatus;
    upvotes?: number;
    createdAt?: Date;
    updatedAt?: Date;
}