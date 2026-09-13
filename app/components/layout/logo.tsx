import Image from 'next/image';

export function Logo({ height = 22 }: { height?: number }) {
  return (
    <Image
      src="/nomadicode-logo.png"
      alt="Nomadicode"
      width={Math.round((height * 5000) / 1136)}
      height={height}
      style={{ height, width: 'auto' }}
      priority
    />
  );
}
