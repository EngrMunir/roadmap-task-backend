import { Request, Response } from 'express';
import status from 'http-status';
import { catchAsync } from '../../app/utils/catchAsync';
import { RoadmapService } from './roadmap.service';
import sendResponse from '../../app/utils/sendResponse';


const createRoadmap = catchAsync(async (req: Request, res: Response) => {
  const result = await RoadmapService.createRoadmap(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Roadmap created successfully',
    data: result,
  });
});

const getAllRoadmap = catchAsync(async (req: Request, res: Response) => {
  const result = await RoadmapService.getAllRoadmap();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Roadmap retrieved successfully',
    data: result,
  });
});

const getSingleRoadmap = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
  const result = await RoadmapService.getSingleRoadmap(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single roadmap retrieved successfully',
    data: result,
  });
});


export const RoadmapController = {
  getAllRoadmap,
  getSingleRoadmap,
  createRoadmap,
};