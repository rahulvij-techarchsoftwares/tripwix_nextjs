export interface CustomCheckboxProps {
  label: string;
  checked?: boolean;
  onChange: (value: boolean) => void;
  extraClasses?: string;
  capitalizeLabel?: boolean;
}
