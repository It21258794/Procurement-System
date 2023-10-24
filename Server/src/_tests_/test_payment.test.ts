import type * as TestFunctions from '../services/payment.service';
const { MongoClient } = require('mongodb');
import paymentService from '../services/payment.service';

const successCases = [
  {
    id: 0,
    input: {
      order_id: '652522cfa5e2fa9ea0ddbfc5',
      accountNumber: '123456789',
      accountHolderName: 'supplier1',
      bankName: 'BOC',
      price: 10000,
    },
    output: {
      order_id: '652522cfa5e2fa9ea0ddbfc5',
      accountNumber: '123456789',
      accountHolderName: 'supplier1',
      bankName: 'BOC',
      price: 10000,
      _id: '65379093060dcd4868e59eb8',
      createdAt: '2023-10-24T09:38:28.016Z',
      updatedAt: '2023-10-24T09:38:28.016Z',
      __v: 0,
    },
  },
];

// describe('MongoDB service', () => {
//     let connection: { db: (arg0: number) => any; close: () => any; };
//     let db;
//     beforeAll(async () => {
//         connection = await MongoClient.connect(process.env.MONGODB_URI, {
//           useNewUrlParser: true,
//           useUnifiedTopology: true,
//         });
//         console.log("here")
//       });

//       afterAll(async () => {
//         await connection.close();
//       });

// })

describe('Test create payment function', () => {
  it.each(successCases)('success case $id', ({ input, output }) => {
    expect(paymentService.createPayment(input)).toBe(output);
  });
});
