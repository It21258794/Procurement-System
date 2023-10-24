// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import BudgetRequestList from './components/supervisor/pages/BudgetRequestList';

// // Mock any dependencies like axios and socket.io-client

// describe('BudgetRequestList Component', () => {
//   beforeEach(() => {
//     // Mock any dependencies or setup here, e.g., axios or socket.io-client
//   });

//   it('renders the component', () => {
//     render(<BudgetRequestList />);
//     // Ensure that the component renders without errors
//     expect(screen.getByRole('table')).toBeInTheDocument();
//   });

//   it('displays budget requests', () => {
//     const mockBudgetRequests = [
//       // Create mock data similar to the structure of your BudgetRequest interface
//       { _id: '1', site_id: 'Site1', amount: 100, location: 'Location1', description: 'Description1', status: 'Pending' },
//       { _id: '2', site_id: 'Site2', amount: 200, location: 'Location2', description: 'Description2', status: 'Approved' },
//     ];

//     render(<BudgetRequestList budgetRequests={mockBudgetRequests} });

//     // Verify that the component renders data correctly
//     expect(screen.getByText('Site1')).toBeInTheDocument();
//     expect(screen.getByText('Site2')).toBeInTheDocument();
//     expect(screen.getByText('Pending')).toBeInTheDocument();
//     expect(screen.getByText('Approved')).toBeInTheDocument();
//   });

//   it('handles budget request actions', () => {
//     const mockBudgetRequest = {
//       _id: '1',
//       site_id: 'Site1',
//       amount: 100,
//       curr_budget: 500,
//       location: 'Location1',
//       description: 'Description1',
//       status: 'Pending',
//     };

//     render(<BudgetRequestList budgetRequests={[mockBudgetRequest]} />);

//     // Mock API requests using jest.spyOn or similar methods

//     const confirmButton = screen.getByText('Confirm');
//     const rejectButton = screen.getByText('Reject');

//     fireEvent.click(confirmButton);
//     // Verify that the confirm action was called correctly

//     fireEvent.click(rejectButton);
//     // Verify that the reject action was called correctly
//   });
// });
// function beforeEach(arg0: () => void) {
//   throw new Error('Function not implemented.');
// }

// function expect(arg0: any) {
//   throw new Error('Function not implemented.');
// }
