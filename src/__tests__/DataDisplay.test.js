import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import DataDisplay from "../components/DataDisplay";

test('renders DataDisplay buttons', () => {
    render(<DataDisplay />);

    const previousButton = screen.getByRole('button', { name: /Previous/i });
    const nextButton = screen.getByRole('button', { name: /Next/i });

    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
});
