interface Props {
  fill?: string;
  width?: string;
  height?: string;
  className?: string;
}

export default function PhoneIcon({
  fill = '#388585',
  width = '48px',
  height = '48px',
  className = '',
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="-2 1 20 12"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill={fill}
        d="M5,16h6c1.105,0,2-0.895,2-2V2c0-1.105-0.895-2-2-2H5C3.895,0,3,0.895,3,2v12C3,15.105,3.895,16,5,16z M4,2h8v12H4V2z"
      />
    </svg>
  );
}
