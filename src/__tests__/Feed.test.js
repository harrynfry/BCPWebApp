import React from 'react';
import { render, screen } from '@testing-library/react';
import Feed from '../components/Feed';

// Mock data for testing
const mockData = [
    {
      id: '1',
      link: 'https://example.com/1',
      description: 'Description for item 1',
      dateTime: 'Published: Thursday 01 January 2024',
    },
    {
      id: '2',
      link: 'https://example.com/2',
      description: 'Description for item 2',
      dateTime: 'Published: Friday 02 January 2024',
    },
  ];

// Mock useFirestore hook
jest.mock('../firebase/useFirestore', () => ({
  __esModule: true,
  default: () => ({
    getFeed: jest.fn().mockResolvedValue(mockData),
  }),
}));


test('Feed component, renders multiple items in child component', async () => {
  
      // Render the Feed component with mock data
      render(<Feed data={mockData} />);
  
      // Check if the link, description, and date/time for each item are rendered
      expect(await screen.findByText('https://example.com/1')).toBeInTheDocument();
      expect(await screen.findByText('Description for item 1')).toBeInTheDocument();
      expect(await screen.findByText('Published: Thursday 01 January 2024')).toBeInTheDocument();
  
      expect(await screen.findByText('https://example.com/2')).toBeInTheDocument();
      expect(await screen.findByText('Description for item 2')).toBeInTheDocument();
      expect(await screen.findByText('Published: Friday 02 January 2024')).toBeInTheDocument();
  });