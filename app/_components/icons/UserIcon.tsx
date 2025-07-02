interface Props {
  fill?: string;
  width?: string;
  height?: string;
  hover?: boolean;
}

export default function UserIcon({
  fill = '#388585',
  width = '48px',
  height = '48px',
  hover = false,
}: Props) {
  return (
    <svg
      className="group"
      width={width}
      height={height}
      viewBox="0 1 24 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>User Icon</title>
      <circle
        className={`${
          hover
            ? 'group-hover:fill-detail-0 transition-colors duration-200'
            : ''
        }`}
        cx="12"
        cy="8"
        fill={fill}
        r="4"
      />
      <path
        className={`${
          hover
            ? 'group-hover:fill-detail-0 transition-colors duration-200'
            : ''
        }`}
        d="M20,19v1a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V19a6,6,0,0,1,6-6h4A6,6,0,0,1,20,19Z"
        fill={fill}
      />
    </svg>
  );
}
