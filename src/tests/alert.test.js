import React from "react";
import {render, screen, act, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import AlertDismissible from "../Components/Alert/Alert";

describe('AlertDismissible', () => {
    test('should render the alert with initial countdown', () => {
      render(<AlertDismissible />);
      expect(screen.getByText(/welcome to epibooks/i)).toBeInTheDocument();
      expect(screen.getByText(/this alert will disappear in 7 seconds, thank you!/i)).toBeInTheDocument();
    });
  
    test('should update countdown every second', async () => {
      jest.useFakeTimers();
      render(<AlertDismissible />);
  
      act(() => {
        jest.advanceTimersByTime(1000);
      });
  
      expect(screen.getByText(/this alert will disappear in 6 seconds, thank you!/i)).toBeInTheDocument();
  
      act(() => {
        jest.advanceTimersByTime(2000);
      });
  
      expect(screen.getByText(/this alert will disappear in 4 seconds, thank you!/i)).toBeInTheDocument();
      
      jest.useRealTimers();
    });
  
    test('should not display the alert after countdown finishes', async () => {
        jest.useFakeTimers();
        render(<AlertDismissible />);
      
        act(() => {
          jest.advanceTimersByTime(7000);
        });
      
        await waitFor(() => {
          expect(screen.queryByText(/welcome to epibooks/i)).not.toBeInTheDocument();
        });
      
        jest.useRealTimers();
      });
  });