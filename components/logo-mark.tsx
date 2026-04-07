import Image from "next/image";

type LogoMarkProps = {
  compact?: boolean;
};

export function LogoMark({ compact = false }: LogoMarkProps) {
  return (
    <span className={`logo-mark${compact ? " compact" : ""}`}>
      <Image
        src="/brand/kelel-logo-en.jpg"
        alt="Kelel IT Solution logo"
        fill
        sizes={compact ? "120px" : "188px"}
        priority
      />
    </span>
  );
}
