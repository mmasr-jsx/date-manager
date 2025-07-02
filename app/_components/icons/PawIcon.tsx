interface Props {
  fill?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
}

export default function PawIcon({
  fill = '#388585',
  width = '24px',
  height = '24px',
  onClick,
}: Props) {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 100.000000 100.000000"
      preserveAspectRatio="xMidYMid meet"
      className="feather feather-edit cursor-pointer"
      onClick={onClick}
    >
      <g
        transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
        fill={fill}
        stroke="none"
        className="hover:fill-detail-0 hover:stroke-detail-0"
      >
        <path
          d="M315 950 c-49 -20 -95 -100 -95 -164 0 -95 76 -206 141 -206 66 0
119 93 119 208 0 118 -81 197 -165 162z"
        />
        <path
          d="M611 943 c-18 -9 -45 -34 -60 -57 -22 -34 -26 -50 -26 -116 1 -124
53 -210 129 -210 101 0 180 194 128 313 -34 77 -100 105 -171 70z"
        />
        <path
          d="M88 624 c-38 -20 -78 -92 -85 -153 -11 -91 57 -191 131 -191 62 0
126 102 126 199 -1 53 -34 117 -72 141 -39 23 -63 25 -100 4z"
        />
        <path
          d="M843 619 c-58 -37 -123 -155 -123 -224 0 -69 70 -127 134 -111 91 23
169 182 136 280 -23 71 -86 94 -147 55z"
        />
        <path
          d="M425 442 c-16 -10 -54 -45 -84 -78 -29 -32 -74 -76 -100 -97 -78 -65
-99 -128 -64 -188 20 -34 68 -59 112 -59 18 0 70 9 116 21 81 20 87 21 178 5
111 -19 129 -19 180 -5 26 7 44 21 57 42 42 67 21 114 -72 162 -58 31 -78 49
-124 111 -76 103 -132 127 -199 86z"
        />
      </g>
    </svg>
  );
}
