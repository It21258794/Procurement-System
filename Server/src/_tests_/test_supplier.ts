// import { Request, Response } from 'express';
// import * as siteService from '../services/site.service'; // Import your service functions

// describe('Controller Tests', () => {
//   // Mock Express Request and Response objects
//   const mockRequest = {} as Request;
//   const mockResponse = {
//     status: jest.fn(() => mockResponse),
//     json: jest.fn(),
//   } as unknown as Response;

//   // Test getAllBudgetRequests function
//   it('should return a list of budget requests if available', async () => {
//     // Mock the service function to return some data
//     const mockBudgetRequests = [{ id: '1', status: 'pending' }];
//     jest.spyOn(siteService, 'getAllBudgetRequests').mockResolvedValue(mockBudgetRequests);

//     await getAllBudgetRequests(mockRequest, mockResponse);

//     expect(mockResponse.status).toHaveBeenCalledWith(200);
//     expect(mockResponse.json).toHaveBeenCalledWith({ budgetRequests: mockBudgetRequests });
//   });

//   it('should return a 404 response if no budget requests are found', async () => {
//     // Mock the service function to return an empty array
//     jest.spyOn(siteService, 'getAllBudgetRequests').mockResolvedValue([]);

//     await getAllBudgetRequests(mockRequest, mockResponse);

//     expect(mockResponse.status).toHaveBeenCalledWith(404);
//     expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No budget requests found' });
//   });

//   it('should return a 400 response on error', async () => {
//     // Mock the service function to throw an error
//     jest.spyOn(siteService, 'getAllBudgetRequests').mockRejectedValue(new Error('Test error'));

//     await getAllBudgetRequests(mockRequest, mockResponse);

//     expect(mockResponse.status).toHaveBeenCalledWith(400);
//     expect(mockResponse.json).toHaveBeenCalledWith({ err: 'Test error' });
//   });

//   // You can follow a similar pattern to test other controller functions (budgetApprove, getAllApprovedBudget, budgetReject).
// });
// function getAllBudgetRequests(mockRequest: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, mockResponse: Response<any, Record<string, any>>) {
//     throw new Error('Function not implemented.');
// }

// function expect(status: (code: number) => Response<any, Record<string, any>>) {
//     throw new Error('Function not implemented.');
// }
