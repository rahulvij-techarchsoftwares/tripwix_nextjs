import { DateRange } from 'react-day-picker';

export interface DatePickerProps {
  defaultValue?: DateRange | undefined;
  onChange?: (value: DateRange | undefined) => void;
  value?: DateRange;
}
