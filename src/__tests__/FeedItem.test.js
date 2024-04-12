import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FeedItem from '../components/FeedItem';
import useFirestore from '../firebase/useFirestore'; // Import the useFirestore hook


// Mock the useFirestore hook
jest.mock('../firebase/useFirestore', () => ({
  __esModule: true,
  default: () => ({
    addFeedback: jest.fn(),
    findFeedback: jest.fn(),
  }),
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn(),
}));

describe('Test Feeditem', () =>{

    test('renders all elements in FeedItem component', () => {
        const mockItem = {
          id: '123',
          link: 'https://example.com',
          description: 'Test description',
          dateTime: '2024-04-12T12:00:00Z',
        };
      
        const { getByTestId, getByText } = render(<FeedItem item={mockItem} />);
      
        // Check if key elements are present
        const linkElement = getByTestId('link');
        const descElement = getByTestId('desc');
        const dateTimeElement = getByTestId('dateTime');
        const body1Element = getByTestId('body1');
        const showFeedbackBtnElement = getByTestId('showFeedbackBtn');
      
        // Assert that key elements are present
        expect(linkElement).toBeInTheDocument();
        expect(descElement).toBeInTheDocument();
        expect(dateTimeElement).toBeInTheDocument();
        expect(body1Element).toBeInTheDocument();
        expect(showFeedbackBtnElement).toBeInTheDocument();
      
        // Additional assertions can be added as needed
    });

    test('renders elements after link is clicked', () => {
        // Mock item data
        const item = {
          link: 'https://example.com',
          description: 'Test description',
          dateTime: '2024-04-12T12:00:00Z',
        };
      
        // Render the component
        const { getByTestId, queryByTestId } = render(<FeedItem item={item} />);
      
        // Initially, check that the form elements are not rendered
        expect(queryByTestId('leaveA')).toBeNull();
        expect(queryByTestId('postcode')).toBeNull();
        expect(queryByTestId('feedbackTxt')).toBeNull();
        expect(queryByTestId('char')).toBeNull();
        expect(queryByTestId('submitBtn')).toBeNull();
      
        // Click the link
        const linkElement = getByTestId('link');
        fireEvent.click(linkElement);
      
        // After clicking the link, check that the form elements are rendered
        expect(getByTestId('leaveA')).toBeInTheDocument();
        expect(getByTestId('postcode')).toBeInTheDocument();
        expect(getByTestId('feedbackTxt')).toBeInTheDocument();
        expect(getByTestId('char')).toBeInTheDocument();
        expect(getByTestId('submitBtn')).toBeInTheDocument();
    });

    test('submits form data correctly', async () => {
        // Mock item data
        const item = {
          link: 'https://example.com',
          description: 'Test description',
          dateTime: '2024-04-12T12:00:00Z',
        };
    
        // Render the component
        const { getByTestId } = render(<FeedItem item={item} />);

        // Click the link to show the form
        const linkElement = getByTestId('link');
        fireEvent.click(linkElement);

        // Fill in form inputs
        const postcodeInput = getByTestId('postcodeinput');
        fireEvent.change(postcodeInput, { target: { value: '12345' } });

        const commentTextarea = getByTestId('feedbackTxtArea');
        fireEvent.change(commentTextarea, { target: { value: 'Test comment' } });

        // Submit the form
        const submitBtn = getByTestId('submitBtn');
        fireEvent.click(submitBtn);

      });
    
})


