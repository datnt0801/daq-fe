// Slideshow.tsx
import { useEffect, useRef, useState } from "react";

type Slide = {
  id: string | number;
  image: string;
  title?: string;
  subtitle?: string;
};

export default function Slideshow({
  slides,
  autoPlay = true,
  interval = 3000,
  className = "",
}: {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}) {
  const length = slides.length;
  const extendedSlides = [slides[length - 1], ...slides, slides[0]];

  const [index, setIndex] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const goPrev = () => setIndex((i) => i - 1);
  const goNext = () => setIndex((i) => i + 1);

  // AutoPlay
  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = window.setInterval(goNext, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, interval]);

  // Hover pause
  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  const handleMouseLeave = () => {
    if (!autoPlay) return;
    timerRef.current = window.setInterval(goNext, interval);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Reset clone loop
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (index === length + 1) {
      setTimeout(() => {
        track.style.transition = "none";
        setIndex(1);
        track.style.transform = `translateX(-100%)`;
        setTimeout(() => (track.style.transition = ""), 50);
      }, 700);
    }

    if (index === 0) {
      setTimeout(() => {
        track.style.transition = "none";
        setIndex(length);
        track.style.transform = `translateX(-${length * 100}%)`;
        setTimeout(() => (track.style.transition = ""), 50);
      }, 700);
    }
  }, [index, length]);

  // Swipe Logic
  const startXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    isDraggingRef.current = true;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    startXRef.current = clientX;
  };

  const handleTouchMove = () => {};

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDraggingRef.current || startXRef.current === null) return;
    const clientX =
      "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = clientX - startXRef.current;

    if (diff > 50) goPrev();
    else if (diff < -50) goNext();

    isDraggingRef.current = false;
    startXRef.current = null;
  };

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-roledescription="carousel"
    >
      <div className="relative max-w-5xl mx-auto overflow-hidden">
        <div
          ref={trackRef}
          className="flex transition-transform duration-700 ease-out"
          style={{
            width: `${extendedSlides.length * 100}%`,
            transform: `translateX(-${index * (100 / extendedSlides.length)}%)`,
          }}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {extendedSlides.map((s, i) => (
            <div key={i} className="w-full">
              <img
                src={s.image}
                alt={s.title || "slide"}
                className="w-full h-72 md:h-120 object-cover object-left rounded-lg select-none"
                draggable={false}
              />
            </div>
          ))}
        </div>

        <button
          onClick={goPrev}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
        >
          ‹
        </button>
        <button
          onClick={goNext}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
        >
          ›
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i + 1)}
            className={`w-3 h-3 rounded-full ${
              i + 1 === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
