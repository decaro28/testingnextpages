"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";

export function HeroIntro() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const items = root.querySelectorAll<HTMLElement>("[data-anim]");

      gsap.set(items, { autoAlpha: 0, y: 14 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(items, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
      });

      tl.fromTo(
        "[data-underline]",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.5, ease: "power2.out" },
        "-=0.35"
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="mx-auto max-w-5xl px-6 py-20">
      <div className="max-w-2xl">
        <div data-anim className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
          <span className="text-muted-foreground">Template:</span>
          <span className="font-medium">Next + TS + shadcn + GSAP</span>
        </div>

        <h1 data-anim className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          next_template
        </h1>

        <div data-underline className="mt-3 h-[2px] w-40 bg-foreground/80" />

        <p data-anim className="mt-6 text-lg text-muted-foreground">
          Placeholder homepage with GSAP entrance animation. Replace sections as you build.
        </p>

        <div data-anim className="mt-8 flex flex-wrap gap-3">
          <Button>Primary CTA</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </div>
    </div>
  );
}

