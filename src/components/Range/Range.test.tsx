import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Range from './Range';

// Mock del hook useRangeSlider
jest.mock('@/hooks/useRangeSlider', () => ({
  useRangeSlider: jest.fn().mockReturnValue({
    minValue: 0,
    maxValue: 100,
    rangeRef: { current: null },
    convertValueToPercent: (value: number) => value,
  }),
}));

describe('Range', () => {
  it('renders with minimum and maximum values', () => {
    render(<Range min={0} max={100} />);
    expect(screen.getByText(/Min: 0\.00/)).toBeInTheDocument();
    expect(screen.getByText(/Max: 100\.00/)).toBeInTheDocument();
  });

  it('renders with fixed values', () => {
    render(<Range min={0} max={100} rangeValues={[10, 90]} />);
    expect(screen.getByText(/Min: 10\.00/)).toBeInTheDocument();
    expect(screen.getByText(/Max: 90\.00/)).toBeInTheDocument();
  });
});
