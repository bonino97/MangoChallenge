'use client';

import React from 'react';
import { useRangeSlider } from '@/hooks/useRangeSlider';

interface RangeProps {
  min: number;
  max: number;
  rangeValues?: number[];
}

const Range: React.FC<RangeProps> = (props) => {
  const { minValue, maxValue, rangeRef, convertValueToPercent } =
    useRangeSlider(props);

  return (
    <div className='relative w-full h-6'>
      <div ref={rangeRef} className='bg-gray-200 h-2 w-full rounded-md'></div>
      <div
        className='bg-blue-500 h-6 w-6 rounded-full absolute cursor-grab transform -translate-y-1/2 -translate-x-1/2 top-1/2'
        style={{ left: `${convertValueToPercent(minValue)}%` }}
        tabIndex={0}
      ></div>
      <div
        className='bg-blue-700 h-6 w-6 rounded-full absolute cursor-pointer transform -translate-y-1/2 -translate-x-1/2 top-1/2'
        style={{ left: `${convertValueToPercent(maxValue)}%`, zIndex: 2 }}
        tabIndex={0}
      ></div>
      <div className='text-center mt-20'>
        {`Min: ${minValue.toFixed(2)}, Max: ${maxValue.toFixed(2)}`}
      </div>
    </div>
  );
};

export default Range;
