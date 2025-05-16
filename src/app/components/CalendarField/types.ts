import { CustomIconVariant } from '~/components/CustomIcon';

export interface CalendarFieldProps {
  ref?: any;
  extraClasses?: string;
  placeholder?: string;
  defaultValue?: Date;
  readOnly?: boolean;
  onChange: (date: Date) => void;
  iconVariant: CustomIconVariant;
  minDate?: Date;
}
