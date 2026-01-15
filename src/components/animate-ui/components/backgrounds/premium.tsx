'use client';

import * as React from 'react';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

import { StarsBackground, type StarsBackgroundProps } from './stars';

type PremiumBackgroundProps = Omit<StarsBackgroundProps, 'backgroundClassName' | 'tintClassName'> & {
  intensity?: number;
};

function PremiumBackground({
  className,
  children,
  intensity = 1,
  starColor = 'rgba(226,203,255,0.85)',
  speed = 70,
  factor = 0.03,
  pointerEvents = false,
  ...props
}: PremiumBackgroundProps) {
  return (
    <StarsBackground
      className={cn('min-h-screen text-foreground', className)}
      backgroundClassName="bg-[radial-gradient(ellipse_at_bottom,_rgba(99,102,241,0.12)_0%,_rgba(217,70,239,0.08)_35%,_#000_72%)]"
      tintClassName="bg-[radial-gradient(800px_circle_at_20%_20%,rgba(244,63,94,0.06),transparent_55%),radial-gradient(700px_circle_at_80%_30%,rgba(99,102,241,0.08),transparent_60%),radial-gradient(600px_circle_at_50%_90%,rgba(217,70,239,0.06),transparent_60%)]"
      starColor={starColor}
      speed={speed}
      factor={factor}
      pointerEvents={pointerEvents}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          aria-hidden="true"
          className="absolute -left-24 -top-24 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.55),transparent_60%)] blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, 30, 0],
            opacity: [0.45 * intensity, 0.7 * intensity, 0.45 * intensity],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute -right-32 top-12 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_70%_30%,rgba(217,70,239,0.52),transparent_60%)] blur-3xl"
          animate={{
            x: [0, -70, 0],
            y: [0, 60, 0],
            opacity: [0.4 * intensity, 0.65 * intensity, 0.4 * intensity],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-[55%] h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(244,63,94,0.42),transparent_62%)] blur-3xl"
          animate={{
            x: [0, 45, 0],
            y: [0, -30, 0],
            opacity: [0.25 * intensity, 0.45 * intensity, 0.25 * intensity],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_10%,rgba(0,0,0,0.18),rgba(0,0,0,0.82))]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.22] mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_0)] [background-size:3px_3px]"
        />
      </div>

      <div className="relative z-10">{children}</div>
    </StarsBackground>
  );
}

export { PremiumBackground, type PremiumBackgroundProps };
