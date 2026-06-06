import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function GsapSnapScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sections = gsap.utils.toArray<HTMLElement>(".snap-section");

    // Snap scroll effect
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      snap: {
        snapTo: 1 / (sections.length - 1),
        duration: 0.8,
        delay: 0,
        ease: "power2.inOut"
      }
    });

    // Parallax and fade animations for each section
    sections.forEach((section, i) => {
      const content = section.querySelector(".snap-content");
      const bg = section.querySelector(".snap-bg");

      if (content) {
        gsap.fromTo(
          content,
          {
            opacity: 0,
            y: 100,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top center",
              end: "center center",
              scrub: 1,
            }
          }
        );
      }

      if (bg) {
        gsap.fromTo(
          bg,
          {
            scale: 1.2,
          },
          {
            scale: 1,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }

      // Pin the section while scrolling
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: false,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="gsap-snap-container">
      {/* Section 1 - Hero */}
      <section className="snap-section h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
        <div className="snap-bg absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1763165561886-a9391b2132c1?w=1920')] bg-cover bg-center" />
        </div>
        <div className="snap-content relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="text-7xl font-black mb-6">
            Luxury in Motion
          </h1>
          <p className="text-2xl opacity-90">
            Experience premium vehicles with smooth scrolling
          </p>
        </div>
      </section>

      {/* Section 2 - Feature 1 */}
      <section className="snap-section h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500">
        <div className="snap-bg absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920')] bg-cover bg-center" />
        </div>
        <div className="snap-content relative z-10 text-center text-white px-6 max-w-4xl">
          <div className="text-6xl mb-6">🚗</div>
          <h2 className="text-6xl font-black mb-4">
            Premium Selection
          </h2>
          <p className="text-xl opacity-90">
            Curated collection of the world's finest automobiles
          </p>
        </div>
      </section>

      {/* Section 3 - Feature 2 */}
      <section className="snap-section h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-900 via-pink-700 to-pink-500">
        <div className="snap-bg absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1603189617530-6d32306f57c5?w=1920')] bg-cover bg-center" />
        </div>
        <div className="snap-content relative z-10 text-center text-white px-6 max-w-4xl">
          <div className="text-6xl mb-6">✨</div>
          <h2 className="text-6xl font-black mb-4">
            Certified Excellence
          </h2>
          <p className="text-xl opacity-90">
            Every vehicle rigorously inspected and certified
          </p>
        </div>
      </section>

      {/* Section 4 - Feature 3 */}
      <section className="snap-section h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-500">
        <div className="snap-bg absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605556816125-d752c226247b?w=1920')] bg-cover bg-center" />
        </div>
        <div className="snap-content relative z-10 text-center text-white px-6 max-w-4xl">
          <div className="text-6xl mb-6">🏆</div>
          <h2 className="text-6xl font-black mb-4">
            Trusted Service
          </h2>
          <p className="text-xl opacity-90">
            Over a decade of excellence in luxury automotive
          </p>
        </div>
      </section>

      {/* Section 5 - CTA */}
      <section className="snap-section h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="snap-bg absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920')] bg-cover bg-center" />
        </div>
        <div className="snap-content relative z-10 text-center text-white px-6 max-w-4xl">
          <h2 className="text-6xl font-black mb-8">
            Ready to Drive?
          </h2>
          <div className="flex gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-lg transition-colors">
              Browse Inventory
            </button>
            <button className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white text-lg font-bold rounded-lg border-2 border-white/30 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .gsap-snap-container {
          position: relative;
        }

        .snap-section {
          position: relative;
          width: 100%;
        }

        .snap-content {
          will-change: transform, opacity;
        }

        .snap-bg {
          will-change: transform;
        }
      `}</style>
    </div>
  );
}

// Snap scroll for existing content sections
export function useGsapSnapScroll(sectionSelector: string = ".snap-section") {
  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>(sectionSelector);

    if (sections.length === 0) return;

    // Create snap effect
    ScrollTrigger.create({
      snap: {
        snapTo: 1 / (sections.length - 1),
        duration: 0.5,
        delay: 0.1,
        ease: "power2.inOut"
      }
    });

    // Animate each section on scroll
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0.5,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [sectionSelector]);
}
