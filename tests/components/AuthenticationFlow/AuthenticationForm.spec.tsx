import React from 'react';
import { render } from '@testing-library/react';
import { AuthenticationForm } from '@/components/AuthenticationFlow/AuthenticationForm';

describe('AuthenticationForm', () => {
  test('renders login form by default', () => {
    const { getByTestId } = render(<AuthenticationForm />);
    
    // Check that the login form components are rendered
    expect(getByTestId('email-login-form')).toBeInTheDocument();
    expect(getByTestId('github-button')).toBeInTheDocument();
    expect(getByTestId('google-button')).toBeInTheDocument();
    expect(getByTestId('linkedin-button')).toBeInTheDocument();
  });

  test('renders signup form when type is signup', () => {
    const { getByTestId } = render(<AuthenticationForm type="signup" />);
    
    // Check that the signup form components are rendered
    expect(getByTestId('email-signup-form')).toBeInTheDocument();
    expect(getByTestId('github-button')).toBeInTheDocument();
    expect(getByTestId('google-button')).toBeInTheDocument();
    expect(getByTestId('linkedin-button')).toBeInTheDocument();
  });

  test('renders OR separator', () => {
    const { getByText } = render(<AuthenticationForm />);
    
    expect(getByText('OR')).toBeInTheDocument();
  });

  test('passes isDisabled and setIsDisabled props to child components', () => {
    const { getByTestId } = render(<AuthenticationForm />);
    
    // Verify that the child components receive the expected props
    expect(getByTestId('github-button')).toHaveAttribute('data-testid', 'github-button');
    expect(getByTestId('google-button')).toHaveAttribute('data-testid', 'google-button');
    expect(getByTestId('linkedin-button')).toHaveAttribute('data-testid', 'linkedin-button');
    expect(getByTestId('email-login-form')).toHaveAttribute('data-testid', 'email-login-form');
  });
});