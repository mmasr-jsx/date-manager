interface Props {
  width?: string;
  height?: string;
  fill?: string;
  stroke?: string;
}

export default function WarningIcon({
  width = '32px',
  height = '32px',
  fill = '#FFFFFF',
  stroke = '#000',
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 520 520"
      xmlns="http://www.w3.org/2000/svg"
      className="grid justify-self-end"
    >
      <title>Warning Icon</title>
      <path
        d="M85.57,446.25H426.43a32,32,0,0,0,28.17-47.17L284.18,82.58c-12.09-22.44-44.27-22.44-56.36,0L57.4,399.08A32,32,0,0,0,85.57,446.25Z"
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32px"
      />
      <path
        d="M250.26,195.39l5.74,122,5.73-121.95a5.74,5.74,0,0,0-5.79-6h0A5.74,5.74,0,0,0,250.26,195.39Z"
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32px"
      />
      <path d="M256,397.25a20,20,0,1,1,20-20A20,20,0,0,1,256,397.25Z" />
    </svg>
  );
}
