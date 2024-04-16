import React from 'react';
import { render } from '@testing-library/react';
import GrossInc from '../components/GrossInc';

// test pie chart renders

test('renders pie chart', () => {
  const { getByLabelText } = render(<GrossInc />);
  const pieChart = getByLabelText('pie-chart');
  expect(pieChart).toBeInTheDocument();
});
