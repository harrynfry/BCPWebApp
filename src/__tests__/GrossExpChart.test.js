import React from 'react';
import { render } from '@testing-library/react';
import GrossExpChart from '../components/GrossExpChart';

test('renders pie chart', () => {
  const { getByLabelText } = render(<GrossExpChart />);
  const pieChart = getByLabelText('pie-chart');
  expect(pieChart).toBeInTheDocument();
});
