export interface RangeSliderProps {
  min?: number;
  max?: number;
  selectedMin?: number;
  selectedMax?: number;
  extraClasses?: string;
  onChange: (values: { min: number; max: number }) => void;
}
