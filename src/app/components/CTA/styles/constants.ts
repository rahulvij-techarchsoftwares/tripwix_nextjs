import { ButtonVariants } from '../types';

const commonStyles =
  'transition-colors gap-2 inline-flex w-fit items-center text-center';

export const baseStyles: Record<ButtonVariants, string> = {
  [ButtonVariants.Default]: `${commonStyles} font-bold px-10 py-4 rounded-2xl text-black border border-black hover:bg-primary hover:text-white hover:border-primary`,
  [ButtonVariants.Primary]: `${commonStyles} font-bold px-10 py-4 rounded-2xl bg-primary text-white border-primary hover:bg-success hover:border-success`,
  [ButtonVariants.Secondary]: `${commonStyles} font-bold px-10 py-4 rounded-2xl bg-green-500 text-white`,
  [ButtonVariants.Success]: `${commonStyles} font-bold px-10 py-4 rounded-2xl bg-success text-white border-primary hover:bg-primary font-bold`,
  [ButtonVariants.FormFieldSuccess]: `transition-colors gap-2 items-center text-center font-semibold px-10 py-3 rounded-2xl bg-success text-white border-primary hover:bg-primary hover:border-primary`,
  [ButtonVariants.Danger]: `${commonStyles} w-full justify-center font-bold px-10 py-4 rounded-2xl bg-error text-white border-danger hover:bg-primary text-center`,
  [ButtonVariants.Dropdown]: `${commonStyles} flex py-2 px-4 rounded-xl text-black border border-tertiary-30 bg-white`,
  [ButtonVariants.DropdownFooter]: `${commonStyles} flex py-2 px-4 rounded-xl text-black border border-white bg-transparent text-white`,
  [ButtonVariants.DropdownActive]: `${commonStyles} flex py-2 px-4 rounded-xl text-black border border-tertiary-30 bg-primary text-white`,
  [ButtonVariants.DropdownHeader]: `${commonStyles} flex`,
  [ButtonVariants.Popup]: `${commonStyles} flex py-2 px-4 rounded-xl border border-primary bg-white text-primary hover:bg-primary hover:text-white`,
  [ButtonVariants.PopupTransparent]: `${commonStyles} flex py-2 px-4 rounded-xl text-white border hover:bg-white hover:text-primary`,
  [ButtonVariants.WhiteTransparent]: `${commonStyles} font-bold px-6 py-4 rounded-2xl bg-white text-primary font-bold hover:bg-primary hover:text-white opacity-90`,
  [ButtonVariants.Newsletter]: `${commonStyles} font-bold px-10 py-4 rounded-2xl bg-gray-200 text-black`,
  [ButtonVariants.Link]: `${commonStyles} underline underline-offset-4`,
  [ButtonVariants.FormFieldFilterBar]: `${commonStyles} text-black`,
  [ButtonVariants.BookingFormSuccess]: `transition-colors font-bold px-10 py-4 rounded-2xl bg-success text-white border-primary hover:bg-primary font-bold block text-center`,
};
