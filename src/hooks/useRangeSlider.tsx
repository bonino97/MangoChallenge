import { useState, useRef, useEffect, useCallback } from 'react';

interface RangeSliderHookProps {
  min: number;
  max: number;
  rangeValues?: number[];
}

interface RangeSliderHook {
  minValue: number;
  maxValue: number;
  rangeRef: React.RefObject<HTMLDivElement>;
  setMinValue: React.Dispatch<React.SetStateAction<number>>;
  setMaxValue: React.Dispatch<React.SetStateAction<number>>;
  convertValueToPercent: (value: number) => number;
}

export function useRangeSlider({
  min,
  max,
  rangeValues,
}: RangeSliderHookProps): RangeSliderHook {
  const [minValue, setMinValue] = useState<number>(min);
  const [maxValue, setMaxValue] = useState<number>(max);
  const rangeRef = useRef<HTMLDivElement>(null);

  const convertValueToPercent = useCallback(
    (value: number): number => {
      return ((value - min) / (max - min)) * 100;
    },
    [min, max]
  );

  const updateValue = useCallback(
    (clientX: number, type: 'min' | 'max') => {
      if (!rangeRef.current) return;

      const rect = rangeRef.current.getBoundingClientRect();
      const percent = (clientX - rect.left) / rect.width;
      let value = Math.round(min + (max - min) * percent);

      value = Math.max(min, Math.min(max, value));

      if (rangeValues && rangeValues.length > 0) {
        const closest = rangeValues.reduce((prev, curr) => {
          return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
        });
        value = closest;
      }

      if (type === 'min') {
        if (value > maxValue) return;
        setMinValue(value);
      } else if (type === 'max') {
        if (value < minValue) return;
        setMaxValue(value);
      }
    },
    [max, min, maxValue, minValue, rangeValues]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.buttons !== 1) return;
      if (!rangeRef.current) return;

      const rect = rangeRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const value = Math.round(min + (max - min) * percent);

      if (Math.abs(value - minValue) < Math.abs(value - maxValue)) {
        updateValue(e.clientX, 'min');
      } else {
        updateValue(e.clientX, 'max');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [min, max, minValue, maxValue, updateValue]);

  return {
    minValue,
    maxValue,
    rangeRef,
    setMinValue,
    setMaxValue,
    convertValueToPercent,
  };
}
