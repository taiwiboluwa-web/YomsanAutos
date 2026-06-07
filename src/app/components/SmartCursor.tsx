import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

export function SmartCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "click">("default");

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;

      // Check for interactive elements
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.closest("input") !== null ||
        target.closest(".luxury-card") !== null ||
        target.closest(".glass-card") !== null;

      setIsHovering(isInteractive);

      // Get cursor text from data attribute
      const cursorTextAttr = target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");
      setCursorText(cursorTextAttr || "");
    };

    const handleMouseDown = () => setCursorVariant("click");
    const handleMouseUp = () => setCursorVariant(isHovering ? "hover" : "default");

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, isHovering]);

  // Cursor variants
  const variants = {
    default: {
      scale: 1,
      backgroundColor: "rgba(169, 192, 224, 0.3)",
      border: "2px solid rgba(14, 47, 118, 0.6)",
    },
    hover: {
      scale: 1.5,
      backgroundColor: "rgba(14, 47, 118, 0.2)",
      border: "2px solid rgba(169, 192, 224, 0.8)",
    },
    click: {
      scale: 0.8,
      backgroundColor: "rgba(14, 47, 118, 0.4)",
      border: "2px solid rgba(169, 192, 224, 1)",
    },
  };

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="w-8 h-8 rounded-full"
          variants={variants}
          animate={cursorVariant}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      </motion.div>

      {/* Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#0E2F76] dark:bg-[#A9C0E0] rounded-full pointer-events-none z-[10001] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Cursor Trail */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9999] opacity-20"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(169, 192, 224, 0.4) 0%, transparent 70%)",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {/* Cursor Text */}
      {cursorText && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[10002] text-xs font-semibold text-[#0E2F76] dark:text-[#A9C0E0] px-3 py-1 rounded-full liquid-glass-strong"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-200%",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {cursorText}
        </motion.div>
      )}

      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}

// Magnetic Button Effect Hook
export function useMagneticEffect(ref: React.RefObject<HTMLElement>, strength: number = 0.3) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      element.style.transform = `translate(${distanceX * strength}px, ${distanceY * strength}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = "translate(0, 0)";
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, strength]);
}
