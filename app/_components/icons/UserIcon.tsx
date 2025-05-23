interface Props {
  fill?: string;
  width?: string;
  height?: string;
}

export default function UserIcon({
  fill = '#388585',
  width = '48px',
  height = '48px',
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 1 24 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>User Icon</title>
      <circle cx="12" cy="8" fill={fill} r="4" />
      <path
        d="M20,19v1a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V19a6,6,0,0,1,6-6h4A6,6,0,0,1,20,19Z"
        fill={fill}
      />
    </svg>
  );
}
