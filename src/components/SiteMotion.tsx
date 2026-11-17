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
        smoothWheel: !reduceMotion,
        syncTouch: false,
        anchors: true,
      });

      gsap.registerPlugin(ScrollTrigger);
      const updateScroll = () => ScrollTrigger.update();
      lenis.on("scroll", updateScroll);

      const tick = (time: number) => lenis.raf(time * 1000);
      if (!reduceMotion) {
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }

      const context = gsap.context(() => {
        if (!reduceMotion) {
          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
            gsap.fromTo(element,
              { autoAlpha: 0, y: 22 },
              {
                autoAlpha: 1, y: 0, duration: 0.72, ease: "power2.out",
                scrollTrigger: { trigger: element, start: "top 88%", once: true },
              }
            );
          });

          gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
            const children = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
            gsap.fromTo(children,
              { autoAlpha: 0, y: 18 },
              {
                autoAlpha: 1, y: 0, duration: 0.58, stagger: 0.09, ease: "power2.out",
                scrollTrigger: { trigger: group, start: "top 86%", once: true },
              }
            );
          });
        }
      });

      ScrollTrigger.refresh();
      cleanup = () => {
        context.revert();
        lenis.off("scroll", updateScroll);
        if (!reduceMotion) gsap.ticker.remove(tick);
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
