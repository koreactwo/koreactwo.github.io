

export const XMark = ({className = "size-6"}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>);


export const HomeMark = ({className = "size-6"}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>);

export const BarsMark = ({className = "size-6"}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>);

export const CheckMark = ({className = "size-6"}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>);

export const HeartMark = ({className = "size-6"}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>);

export const PlusMark = ({className = "size-6"}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>);






export const LoadingMark = ({className = "size-6 text-primary"}) =>  {
  // 1. 데이터만 따로 관리 (좌표와 딜레이)
  const lines = [
    { x1: 21, y1: 12, x2: 17, y2: 12 }, // 1. 우측 (3시)
  { x1: 17, y1: 19, x2: 15, y2: 16 }, // 2. 우하 (5시)
  { x1: 8,  y1: 19, x2: 10, y2: 16 }, // 3. 좌하 (7시)
  { x1: 4,  y1: 12, x2: 8,  y2: 12 }, // 4. 좌측 (9시)
  { x1: 8,  y1: 5,  x2: 10, y2: 8  }, // 5. 좌상 (11시)
  { x1: 17, y1: 5,  x2: 15, y2: 8  }  // 6. 우상 (1시)
    // { x1: 21, y1: 12, x2: 17, y2: 12},
    // { x1: 17, y1: 5,  x2: 15, y2: 8},
    // { x1: 8,  y1: 5,  x2: 10, y2: 8},
    // { x1: 4,  y1: 12, x2: 8,  y2: 12},
    // { x1: 8,  y1: 19, x2: 10, y2: 16},
    // { x1: 17, y1: 19, x2: 15, y2: 16},
  ];
  const dur = 1;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      strokeWidth="2"
      strokeLinecap="round"
      stroke="currentColor"
    >
      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} opacity="0">
          <animate
            attributeName="opacity"
            values="1; 0; 0"
            dur={dur + "s"}
            repeatCount="indefinite"
            begin={ dur / 6 * i  + "s"}
          />
        </line>
      ))}
    </svg>
  );
};