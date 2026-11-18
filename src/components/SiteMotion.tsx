"use client";

import { useEffect } from "react";

export default function SiteMotion() {
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    const setup = async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const lenis = new Lenis({
        autoRaf: false,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
      });

      gsap.registerPlugin(ScrollTrigger);
      const updateScroll = () => ScrollTrigger.update();
      lenis.on("scroll", updateScroll);

      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.68,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: element,
                start: "top 90%",
                once: true,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
          const children = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
          if (!children.length) return;

          gsap.fromTo(
            children,
            { autoAlpha: 0, y: 16 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.62,
              stagger: 0.1,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: group,
                start: "top 88%",
                once: true,
              },
            },
          );
        });
      });

      ScrollTrigger.refresh();

      cleanup = () => {
        context.revert();
        lenis.off("scroll", updateScroll);
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    };

    void setup();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
}
