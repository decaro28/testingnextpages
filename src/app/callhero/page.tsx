"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

import { MagicBorder, MagicBorderButton } from "@/components/ui/button";
import { PremiumBackground } from "@/components/animate-ui/components/backgrounds/premium";
import { GlareCard } from "@/components/gsap/glare-card";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
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
        title: "Sounds Human",
        description: "Surprisingly natural and expressive, give it a try for yourself.",
        imageSrc: "/human1.jpg",
        imageBrightness: 1.06,
      },
      {
        title: "Boosts Revenue",
        description: "Captures 25-50% more qualified appointments on average.",
        imageSrc: "/rev1.jpg",
        imageBrightness: 0.79,
      },
    ],
    [],
  );

  return (
    <main className="min-h-screen">
      <PremiumBackground
        intensity={1.1}
        factor={0}
        speed={110}
        starColor="rgba(226,203,255,0.55)"
      >
        <section className="relative min-h-screen text-foreground">
          <div className="relative z-10">
            <CallHeroNavbar items={navItems} />

            <div
              ref={rootRef}
              className="mx-auto max-w-7xl px-6 pb-6 pt-24 md:pt-32"
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
                Your phone rings. Most businesses miss it. We don’t.
                </p>

                <div
                  data-hero
                  className="mt-14 flex flex-col items-center justify-center gap-6"
                >
                  <MagicBorderButton
                    asChild
                    size="lg"
                    wrapperClassName="h-12 rounded-full sm:h-14"
                    className="rounded-full px-8 text-base sm:px-10 sm:text-lg"
                  >
                    <a href="tel:+16476975601">
                      <PhoneSolidIcon className="size-4" />
                      Call Our Demo Agent
                    </a>
                  </MagicBorderButton>
                  <p className="text-sm font-medium text-white/60 sm:text-base">
                    Answers real inbound calls — instantly, 24/7.
                  </p>
                </div>
              </div>
            </div>

          </div>
          <div className="pointer-events-none absolute inset-x-0 -bottom-[3px] flex items-center justify-center px-6">
            <div className="h-px w-full max-w-3xl animate-pulse bg-gradient-to-r from-transparent via-white/60 to-transparent motion-reduce:animate-none" />
          </div>
        </section>

        <section className="relative pb-24 pt-24 text-foreground">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className={cn(
                    "mx-auto w-full max-w-sm transition-all duration-300 sm:max-w-none",
                    hoveredFeature !== null &&
                      hoveredFeature !== index &&
                      "scale-[0.98] opacity-60 saturate-75",
                  )}
                >
                  <GlareCard containerClassName="max-w-none">
                    <div className="group relative flex h-full flex-col items-center justify-between px-5 py-7 text-center sm:px-8 sm:py-10">
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
                      <h3 className="relative z-10 text-xl font-extrabold tracking-tight sm:text-3xl">
                        <span className="inline-block [filter:drop-shadow(0_0_10px_rgba(0,0,0,0.95))_drop-shadow(0_0_22px_rgba(0,0,0,0.8))]">
                          <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-rose-300 bg-clip-text text-transparent">
                            {feature.title}
                          </span>
                        </span>
                      </h3>
                      <p className="relative z-10 mt-4 max-w-[34ch] text-[0.95rem] leading-relaxed text-white/90 sm:mt-6 sm:text-base">
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
        </section>

        <section className="relative pb-24 pt-6 text-foreground">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.35),rgba(14,14,24,0)_70%)] blur-3xl" />
            <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(244,114,182,0.28),rgba(14,14,24,0)_70%)] blur-3xl" />
          </div>
          <ContainerScroll
            titleComponent={
              <div className="mx-auto max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60 sm:text-sm">
                  Clear signal
                </p>
                <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-200 to-rose-300 bg-clip-text text-transparent">
                    Transparent Dashboards
                  </span>
                </h2>
              </div>
            }
          >
            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#0b0b14]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.22),rgba(11,11,20,0)_55%)]" />
              <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.16),rgba(11,11,20,0)_70%)]" />
              <div className="relative z-10 flex h-full flex-col gap-4 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 via-fuchsia-400 to-rose-400" />
                    <div>
                      <p className="text-sm font-semibold text-white">Boost vs. Default</p>
                      <p className="text-xs text-white/60">Baseline compared to AI-run ops</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                      30 days
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                      Live
                    </span>
                  </div>
                </div>

                <div className="grid flex-1 grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-7">
                    <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                      <div className="flex items-center justify-between text-xs text-white/60">
                        <span>Lift by metric</span>
                        <span>Against default routing</span>
                      </div>
                      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {[
                          {
                            label: "Booked appointments",
                            value: "+42%",
                            progress: 76,
                          },
                          { label: "Qualified leads", value: "+31%", progress: 63 },
                          {
                            label: "Recovered after-hours",
                            value: "+58%",
                            progress: 88,
                          },
                          {
                            label: "Avg. response time",
                            value: "-72%",
                            progress: 92,
                          },
                          {
                            label: "Revenue Increase",
                            value: "$312k",
                            progress: 71,
                          },
                          {
                            label: "Answer rate",
                            value: "+64%",
                            progress: 82,
                          },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.35)]"
                          >
                            <div className="flex items-start justify-between">
                              <span className="text-sm text-white/80">
                                {item.label}
                              </span>
                              <span className="text-base font-semibold text-white">
                                {item.value}
                              </span>
                            </div>
                            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                              <div
                                style={{ width: `${item.progress}%` }}
                                className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-rose-400"
                              />
                            </div>
                            <div className="mt-3 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.25em] text-white/40">
                              <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                              Boosted
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 text-xs text-white/50">
                        Baseline uses default phone tree + voicemail.
                      </div>
                    </div>
                  </div>

                  <div className="col-span-12 flex flex-col gap-4 md:col-span-5">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80 backdrop-blur">
                      <div className="flex items-center justify-between text-xs text-white/60">
                        <span>Booking rate comparison</span>
                        <span>Default vs AI</span>
                      </div>
                      <div className="mt-4 h-40 w-full">
                        <svg
                          viewBox="0 0 300 140"
                          className="h-full w-full"
                          preserveAspectRatio="none"
                          aria-hidden="true"
                        >
                          <defs>
                            <linearGradient id="aiLine" x1="0" x2="1" y1="0" y2="0">
                              <stop offset="0%" stopColor="#818cf8" />
                              <stop offset="50%" stopColor="#e879f9" />
                              <stop offset="100%" stopColor="#f472b6" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0 110 L40 105 L80 100 L120 95 L160 90 L200 85 L240 78 L280 70 L300 66"
                            fill="none"
                            stroke="rgba(255,255,255,0.35)"
                            strokeWidth="3"
                          />
                          <path
                            d="M0 115 L40 108 L80 95 L120 88 L160 76 L200 62 L240 52 L280 42 L300 36"
                            fill="none"
                            stroke="url(#aiLine)"
                            strokeWidth="4"
                          />
                        </svg>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/60">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-white/40" />
                          Default 21%
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-rose-400" />
                          AI assistant 63%
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80 backdrop-blur">
                      <div className="flex items-center justify-between text-xs text-white/60">
                        <span>Recent recordings</span>
                        <span>Outcome</span>
                      </div>
                      <div className="mt-4 space-y-3 text-sm">
                        {[
                          { label: "Call 1184 • 03:12", outcome: "Booked" },
                          { label: "Call 1183 • 01:47", outcome: "Qualified" },
                          { label: "Call 1182 • 00:53", outcome: "Follow-up" },
                          { label: "Call 1181 • 02:05", outcome: "Won" },
                        ].map((call) => (
                          <div
                            key={call.label}
                            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                          >
                            <span className="text-white/80">{call.label}</span>
                            <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-xs text-white">
                              {call.outcome}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 h-px w-full bg-white/10" />
                      <p className="mt-3 text-xs text-white/60">
                        Tap any call to audit transcript and resolution.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ContainerScroll>
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
            <a href="tel:+16476975601">
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
              <a href="tel:+16476975601" onClick={() => setIsOpen(false)}>
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
