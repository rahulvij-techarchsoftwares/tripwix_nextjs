interface SpinnerProps {
  extraClasses?: string;
}

export const Spinner = ({ extraClasses }: SpinnerProps) => {
  return (
    <div
      className={`h-8 w-8 inline-block rounded-full border-4 border-r-primary border-solid animate-spin ${extraClasses}`}
      role="status"
    />
  );
};
