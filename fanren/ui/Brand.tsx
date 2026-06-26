import React from 'react';

/**
 * 凡人修仙編年史 · 品牌視覺元件。
 * 取代原「雲靈修仙傳」金色 logo，改以「墨青朱印」識別：朱砂印章 + 青玉字標。
 */

interface SealProps {
  size?: number;
  className?: string;
  char?: string;
  rough?: boolean; // 手鈐印章的微微歪斜質感
}

/** 朱砂印章標記。 */
export const SealMark: React.FC<SealProps> = ({ size = 64, className = '', char = '凡', rough = false }) => {
  const fid = `seal-rough-${char}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} role="img" aria-label="凡人修仙編年史印記">
      <defs>
        {rough && (
          <filter id={fid} x="-12%" y="-12%" width="124%" height="124%">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves={1} seed={11} result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale={2.2} />
          </filter>
        )}
        <linearGradient id="seal-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#cf4334" />
          <stop offset="100%" stopColor="#8c241b" />
        </linearGradient>
      </defs>
      <g filter={rough ? `url(#${fid})` : undefined}>
        <rect x="8" y="8" width="84" height="84" rx="15" fill="url(#seal-grad)" />
        <rect x="15" y="15" width="70" height="70" rx="9" fill="none" stroke="#f3ece0" strokeOpacity={0.6} strokeWidth={2.6} />
        <text x="50" y="51" textAnchor="middle" dominantBaseline="central" fontFamily="'Noto Serif SC', serif" fontWeight={700} fontSize={50} fill="#f6f0e3">
          {char}
        </text>
      </g>
    </svg>
  );
};

/** 朱砂印章 + 後方獨立光暈層（hero 用）。光暈動畫與印章濾鏡解耦，效能友善。 */
export const SealBadge: React.FC<{ size?: number; className?: string; glow?: boolean }> = ({ size = 140, className = '', glow = true }) => (
  <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    {glow && (
      <div
        className="pointer-events-none absolute -inset-[20%] -z-10 animate-aura rounded-[30%] blur-2xl"
        style={{ background: 'radial-gradient(circle, rgba(184,51,42,0.5) 0%, rgba(120,182,155,0.14) 46%, transparent 72%)' }}
      />
    )}
    <SealMark size={size} className="drop-shadow-2xl" />
  </div>
);

interface WordmarkProps {
  className?: string;
  titleClassName?: string;
  sub?: string | false;
}

/** 「凡人修仙編年史」字標：墨底上的青玉漸層。 */
export const Wordmark: React.FC<WordmarkProps> = ({ className = '', titleClassName = 'text-3xl', sub = '一介凡人的修真編年史' }) => (
  <div className={className}>
    <div className={`brand-serif font-bold tracking-[0.22em] pl-[0.22em] bg-gradient-to-b from-[#f4efe2] via-[#cfe6d8] to-[#74b69b] bg-clip-text text-transparent ${titleClassName}`}>
      凡人修仙編年史
    </div>
    {sub && <div className="mt-1 text-[0.7em] tracking-[0.3em] text-[#7c9d8f]/80">{sub}</div>}
  </div>
);

/** 印章＋字標的橫向組合（用於頁首）。 */
export const BrandLockup: React.FC<{ sealSize?: number; titleClassName?: string; sub?: string | false; className?: string }> = ({
  sealSize = 40,
  titleClassName = 'text-xl',
  sub = false,
  className = '',
}) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <SealMark size={sealSize} />
    <Wordmark titleClassName={titleClassName} sub={sub} />
  </div>
);
