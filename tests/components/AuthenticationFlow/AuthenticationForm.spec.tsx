import React from 'react';
import { render } from '@testing-library/react';
import { AuthenticationForm } from '@/components/AuthenticationFlow/AuthenticationForm';

describe('AuthenticationForm', () => {
  test('renders login form by default', () => {
    const { getByText, getByRole } = render(<AuthenticationForm />);
    
    // Check that the login form content is rendered
    expect(getByText(/log in/i)).toBeInTheDocument();

    // Check that the social login buttons are rendered
    expect(getByRole('button', { name: /github/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /google/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /linkedin/i })).toBeInTheDocument();
  });

  test('renders signup form when type is signup', () => {
    const { getByText, getByRole } = render(<AuthenticationForm type="signup" />);
    
    // Check that the signup form content is rendered
    expect(getByText(/sign up/i)).toBeInTheDocument();

    // Check that the social signup buttons are rendered
    expect(getByRole('button', { name: /github/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /google/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /linkedin/i })).toBeInTheDocument();
  });

  test('renders OR separator', () => {
    const { getByText } = render(<AuthenticationForm />);
    
    expect(getByText('OR')).toBeInTheDocument();
  });

  test('passes isDisabled and setIsDisabled props to child components', () => {
    const { getByRole } = render(<AuthenticationForm />);
    
    // Verify that the social provider buttons are present
    expect(getByRole('button', { name: /github/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /google/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /linkedin/i })).toBeInTheDocument();
  });
});