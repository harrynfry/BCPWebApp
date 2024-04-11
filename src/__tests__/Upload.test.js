import React from 'react';
import { render } from '@testing-library/react';
import Upload from '../components/Upload';

// Mocking the useFirestore hook
jest.mock('../firebase/useFirestore', () => ({
  __esModule: true,
  default: () => ({
    uploadArticles: jest.fn(), // Mock the uploadArticles function
  }),
}));

test('renders upload button', () => {
  const { getByText } = render(<Upload />);
  const uploadButton = getByText('Upload');
  expect(uploadButton).toBeInTheDocument();
});
