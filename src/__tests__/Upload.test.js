import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Upload from '../components/Upload';
import { uploadArticles } from '../firebase/useFirestore'; // Import the mocked uploadArticles function

// Mock the firebase/firestore module
jest.mock('firebase/firestore', () => ({
  __esModule: true,
  getFirestore: jest.fn(() => ({
    // Mock implementation for firestore
  })),
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn(),
}));

describe('Test the upload button', () => {

  test('renders upload button', () => {
    const { getByText } = render(<Upload />);
    const uploadButton = getByText("Upload");
    expect(uploadButton).toBeInTheDocument();
  });

  test('executes click handler on button click', () => {
    const { getByText } = render(<Upload />);
    const uploadButton = getByText("Upload");
    fireEvent.click(uploadButton);
  });

});
