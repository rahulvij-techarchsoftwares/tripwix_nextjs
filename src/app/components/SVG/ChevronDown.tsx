export const ChevronDownSVG = ({
  fill = 'none',
  extraClasses,
  width = 10,
  height = 6,
}: {
  fill?: string;
  extraClasses?: string;
  width?: number | string;
  height?: number | string;
}) => (
  <svg
    className={`${extraClasses}`}
    width={width}
    height={height}
    viewBox="0 0 10 6"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 1L5 5L1 1" stroke="currentColor" />
  </svg>
);
