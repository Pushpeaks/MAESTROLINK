/**
 * Frontend unit test for Community page.
 * Requires: @testing-library/react, @testing-library/jest-dom, vitest or jest
 * Run after installing test deps.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Community from '@/pages/Community';

test('renders community heading', () => {
  render(<Community />);
  expect(screen.getByRole('heading', { name: /community/i })).toBeInTheDocument();
});
