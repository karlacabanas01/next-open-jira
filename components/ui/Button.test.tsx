import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
    it('renders a button', () => {
      const { getByText } = render(<Button label="Click me" />);
      const button = getByText('Click me');
      expect(button).toBeInTheDocument();
    });
    
    it('calls onClick function when button is clicked', () => {
      const onClick = jest.fn();
      const { getByText } = render(<Button label="Click me" onClick={onClick} />);
      const button = getByText('Click me');
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
  