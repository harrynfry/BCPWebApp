import React from "react";
import { render, screen } from '@testing-library/react';
import Header from "../components/Header";

// test header renders
test('renders Header', () => {
    render(<Header />);

    const headerTxt = screen.getByText('News from BCP');
    expect(headerTxt).toBeInTheDocument();

    // find msg, ignoring case and whitespace
    const welcomeMsg = screen.getByText(/Welcome/i);
    expect(welcomeMsg).toBeInTheDocument();
});
