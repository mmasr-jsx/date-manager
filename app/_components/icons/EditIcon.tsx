interface Props {
  width?: string;
  height?: string;
  onClick?: () => void;
}

export default function EditIcon({
  width = '24',
  height = '24',
  onClick,
}: Props) {
  return (
    <svg
      className="feather feather-edit clickable"
      fill="none"
      height={height}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
