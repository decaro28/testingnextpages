"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

import { MagicBorder, MagicBorderButton } from "@/components/ui/button";
import { PremiumBackground } from "@/components/animate-ui/components/backgrounds/premium";
import { GlareCard } from "@/components/gsap/glare-card";
import { cn } from "@/lib/utils";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavItems,
  Navbar,
  NavbarButton,
  NavbarLogo,
} from "@/components/gsap/resizable-navbar";

function PhoneSolidIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h2.062a1.5 1.5 0 0 1 1.458 1.087l.7 2.45a1.5 1.5 0 0 1-.41 1.533l-1.04 1.04a10.98 10.98 0 0 0 5.66 5.66l1.04-1.04a1.5 1.5 0 0 1 1.533-.41l2.45.7A1.5 1.5 0 0 1 18 14.438V16.5A1.5 1.5 0 0 1 16.5 18H15c-7.18 0-13-5.82-13-13V3.5Z" />
    </svg>
  );
}

export default function CallHeroPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const navItems = useMemo(
    () => [
      { name: "Product", link: "#product" },
      { name: "Pricing", link: "#pricing" },
      { name: "Docs", link: "#docs" },
    ],
    [],
  );

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const items = root.querySelectorAll<HTMLElement>("[data-hero]");
      gsap.set(items, { autoAlpha: 0, y: 18 });

      gsap.timeline({ defaults: { ease: "power2.out" } }).to(items, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const features = useMemo(
    () => [
      {
        title: "Books 24/7",
        description: "Captures every call and responds instantly—day or night.",
        imageSrc: "/2471.jpg",
        imageBrightness: 1.55,
      },
      {
        title: "Boosts Revenue",
        description: "Captures 25-50% more qualified appointments on average.",
        imageSrc: "/rev1.jpg",
        imageBrightness: 0.79,
      },
      {
        title: "Feels Human",
        description: "Surprisingly natural and expressive, give it a try for yourself.",
        imageSrc: "/human1.jpg",
        imageBrightness: 1.06,
      },
    ],
    [],
  );

  return (
    <main className="min-h-screen">
      <PremiumBackground intensity={1.1}>
        <section className="relative min-h-screen overflow-hidden text-foreground">
          <div className="relative z-10">
            <CallHeroNavbar items={navItems} />

            <div
              ref={rootRef}
              className="mx-auto max-w-7xl px-6 pb-16 pt-24 md:pt-32"
            >
              <div className="mx-auto max-w-5xl text-center">
              <h1
                data-hero
                className="text-balance text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
              >
                <span className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
                  Wait, That Was AI?
                </span>
              </h1>

              <p
                data-hero
                className="my-10 text-balance text-3xl font-bold leading-tight text-white sm:my-12 sm:text-4xl"
              >
              We turn missed calls into loyal customers using the cutting edge of AI voice
              </p>

              <div
                data-hero
                className="mt-8 flex flex-wrap items-center justify-center gap-3"
              >
                <MagicBorderButton
                  asChild
                  size="lg"
                  wrapperClassName="h-11 rounded-full"
                  className="rounded-full px-7"
                >
                  <a href="tel:+14168071489">
                    <PhoneSolidIcon className="size-4" />
                    Call Our Demo Agent
                  </a>
                </MagicBorderButton>
              </div>

              <div
                data-hero
                className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3"
              >
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    onMouseEnter={() => setHoveredFeature(index)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className={cn(
                      "transition-all duration-300",
                      hoveredFeature !== null &&
                        hoveredFeature !== index &&
                        "scale-[0.98] opacity-60 saturate-75",
                    )}
                  >
                    <GlareCard containerClassName="max-w-none">
                      <div className="group relative flex h-full flex-col items-center justify-between px-8 py-10 text-center">
                        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[calc(var(--radius)-1px)]">
                          <img
                            src={feature.imageSrc}
                            alt=""
                            aria-hidden="true"
                            style={
                              {
                                "--img-brightness": feature.imageBrightness,
                              } as React.CSSProperties
                            }
                            className="h-full w-full scale-[1.05] object-cover opacity-45 transition duration-500 group-hover:opacity-60 [filter:grayscale(0.75)_brightness(var(--img-brightness))_contrast(1.1)]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/70 via-slate-950/20 to-slate-950/70" />
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/12 via-transparent to-rose-500/12 opacity-70" />
                        </div>
                        <h3 className="relative z-10 text-3xl font-extrabold tracking-tight">
                          <span className="inline-block [filter:drop-shadow(0_0_10px_rgba(0,0,0,0.95))_drop-shadow(0_0_22px_rgba(0,0,0,0.8))]">
                            <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-rose-300 bg-clip-text text-transparent">
                              {feature.title}
                            </span>
                          </span>
                        </h3>
                        <p className="relative z-10 mt-6 max-w-[34ch] text-sm leading-relaxed text-white/90">
                          <span className="inline-block [filter:drop-shadow(0_0_10px_rgba(0,0,0,0.95))_drop-shadow(0_0_20px_rgba(0,0,0,0.8))]">
                            {feature.description}
                          </span>
                        </p>
                      </div>
                    </GlareCard>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </section>
      </PremiumBackground>
    </main>
  );
}

function CallHeroNavbar({
  items,
}: {
  items: { name: string; link: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar className="top-6">
      <NavBody className="border border-border/60 bg-background/60 backdrop-blur">
        <NavbarLogo />
        <NavItems items={items} />
        <div className="relative z-20 flex items-center gap-2">
          <MagicBorder
            className="rounded-full"
            innerClassName="gap-2 px-4 py-2 text-sm font-bold text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] transition duration-200 group-hover:-translate-y-0.5 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500"
          >
            <a href="tel:+14168071489">
              <PhoneSolidIcon className="size-4" />
              Call Demo
            </a>
          </MagicBorder>
        </div>
      </NavBody>

      <MobileNav className="border border-border/60 bg-background/60 backdrop-blur">
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="bg-background/95 backdrop-blur"
        >
          {items.map((item) => (
            <a
              key={item.link}
              href={item.link}
              onClick={() => setIsOpen(false)}
              className="w-full rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-accent"
            >
              {item.name}
            </a>
          ))}

          <div className="mt-2 flex w-full flex-col gap-2">
            <MagicBorder
              className="w-full rounded-full"
              innerClassName="w-full gap-2 px-4 py-2 text-center text-sm font-bold text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] transition duration-200 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500"
            >
              <a href="tel:+14168071489" onClick={() => setIsOpen(false)}>
                <PhoneSolidIcon className="size-4" />
                Call Demo
              </a>
            </MagicBorder>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
