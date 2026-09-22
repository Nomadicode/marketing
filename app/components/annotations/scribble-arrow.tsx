export function ScribbleArrow({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 90 46"
      fill="none"
      className={`pointer-events-none absolute text-highlight ${className}`}
    >
      <path
        d="M3 4c23 2 39 8 56 24 7 7 13 10 23 13M70 32l12 9-13 2"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
