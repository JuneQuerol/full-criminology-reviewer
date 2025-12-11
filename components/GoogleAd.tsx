'use client';

import { useEffect, useRef } from 'react';

type GoogleAdProps = {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  layout?: string;
  layoutKey?: string;
  className?: string;
};

const GoogleAd = ({ 
  slot = "YOUR_AD_SLOT_ID_HERE", 
  format = "auto", 
  layout,
  layoutKey,
  className = "" 
}: GoogleAdProps) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      // @ts-ignore
      if (window.adsbygoogle) {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  // Don't render in development to avoid spamming impressions (optional, but good practice)
  // Remove strict check if you want to test with placeholders
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className={`p-4 border-2 border-dashed border-gray-300 bg-gray-50 text-center text-gray-500 rounded-lg my-6 ${className}`}>
        <p className="text-sm font-semibold">AdSense Space ({slot})</p>
        <p className="text-xs">(Ads hidden in development)</p>
      </div>
    );
  }

  return (
    <div className={`w-full overflow-hidden my-6 flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-4225764258903216"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        data-ad-layout={layout}
        data-ad-layout-key={layoutKey}
      />
    </div>
  );
};

export default GoogleAd;
