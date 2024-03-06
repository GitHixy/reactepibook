import Error from "../Components/ErrorPage/Error";
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Error Component Tests', () => {
    beforeEach(() => {
      mockNavigate.mockClear();
    });
  test('renders Error component correctly', () => {
    render(
      <BrowserRouter>
        <Error />
      </BrowserRouter>
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/oops!/i)).toBeInTheDocument();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/go to homepage now/i)).toBeInTheDocument();
  });
  test('navigates to homepage on button click', () => {
    render(
      <BrowserRouter>
        <Error />
      </BrowserRouter>
    );
    screen.getByRole('button', { name: /go to homepage now/i }).click();
    expect(mockNavigate).toHaveBeenCalledWith('/reactepibook');
  });
});
