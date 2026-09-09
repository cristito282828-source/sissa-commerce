// /components/AnnouncementBar.tsx
import React from 'react';

type AnnouncementBarProps = {
  text?: string;
  enabled?: boolean;
};

const AnnouncementBar = ({
  text = 'ENVÍO GRATIS en pedidos superiores a $80.000 CLP',
  enabled = true
}: AnnouncementBarProps) => {
  if (!enabled) {
    return null;
  }

  return (
    <div className="h-10 w-full border-b border-[#2f5a47] bg-[#1d3a2b]/95 text-white shadow-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center px-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-emerald-300">✓</span>
          <span className="text-sm font-semibold tracking-wide">{text}</span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
