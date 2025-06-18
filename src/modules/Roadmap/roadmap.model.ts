import { model, Schema, Types } from "mongoose";
import { TRoadmap } from "./roadmap.interface";

const roadmapSchema = new Schema<TRoadmap>(
    {
        title:{ type:String, required:true },
        description: String,
        category: String,
        status: {
            type: String,
            enum: ['Planned', 'In Progress', 'Completed'],
            default: 'Planned',
        },
        upvotes: { type: Number, default: 0 },
        upvotedBy: [{ type: Types.ObjectId, ref: 'User' }] 
    },
    {
        timestamps:true
    }
);

export const Roadmap = model<TRoadmap>('Roadmap',roadmapSchema);