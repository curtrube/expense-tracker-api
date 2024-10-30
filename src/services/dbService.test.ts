// import { describe, it, expect, vi } from 'vitest';
// import pg from 'pg';
// import DbService from './dbService.js';

// vi.mock('pg', () => {
//   return {
//     __esModule: true,
//     default: {
//       Pool: vi.fn().mockImplementation(() => {
//         return {
//           connect: vi.fn().mockResolvedValue({
//             query: vi.fn(),
//             release: vi.fn(),
//           }),
//         };
//       }),
//     },
//   };
// });

// describe('DbService', () => {
//   it('should execute a query and return the result', async () => {
//     const mockQueryResult = { rows: [{ id: 1, name: 'Test' }] };

//     const mockPool = new pg.Pool();
//     const mockClient = await mockPool.connect();

//     const queryMock = mockClient.query as vi.Mock;
//     queryMock.mockResolvedValue(mockQueryResult);

//     const dbService = new DbService(mockPool);
//     const result = await dbService.query('SELECT * FROM users', []);

//     expect(result).toEqual(mockQueryResult.rows);
//     expect(queryMock).toHaveBeenCalledWith('SELECT * FROM users', []);
//     expect(mockClient.release).toHaveBeenCalled();
//   });

//   it('should handle errors thrown by the query method', async () => {
//     const mockError = new Error('Database error');
//     const mockPool = new pg.Pool();
//     const mockClient = await mockPool.connect();

//     const queryMock = mockClient.query as vi.Mock;
//     queryMock.mockRejectedValue(mockError);

//     const dbService = new DbService(mockPool);

//     await expect(dbService.query('SELECT * FROM users', [])).rejects.toThrow('Database error');
//     expect(mockClient.release).toHaveBeenCalled();
//   });
// });
