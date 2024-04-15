import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import DataDisplay from "../components/DataDisplay";

test('renders DataDisplay buttons', () => {

    // render datadisplay
    render(<DataDisplay />);
    // get show charts btn
    const showChartsButton = screen.getByRole('button', { name: /Show spending data/i });
    // click
    fireEvent.click(showChartsButton); 
    // find prev and next btns
    const previousButton = screen.getByRole('button', { name: /Previous/i });
    const nextButton = screen.getByRole('button', { name: /Next/i });
    // expect btns to be in doc
    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    //click hide btn
    fireEvent.click(showChartsButton); 
    // expect them to be gone
    expect(previousButton).not.toBeInTheDocument();
    expect(nextButton).not.toBeInTheDocument();
});
