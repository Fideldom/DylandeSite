import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type MotionVariant = "fill" | "mask" | "drift" | "blur" | "outline" | "split" | "scrollFill" | "parallax" | "wipe" | "cinematic";

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={reduce ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: .72, delay, ease: [0.22, 1, .36, 1] }}>{children}</motion.div>;
}

export function MotionHeroTitle({ title, variant = "cinematic", className = "" }: { title: string; variant?: MotionVariant; className?: string }) {
  const reduce = useReducedMotion();
  const words = title.split(" ");
  const chars = Array.from(title);
  const base = "motion-hero-title";
  if (reduce) return <h1 className={`${base} ${className}`}>{title}</h1>;

  if (variant === "drift") return <h1 className={`${base} ${base}-drift ${className}`}>{chars.map((char, i) => <motion.span key={`${char}-${i}`} style={{ display: char === " " ? "inline" : "inline-block" }} initial={{ opacity: 0, x: i % 2 ? 10 : -10, y: i % 3 === 0 ? -8 : 8 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: i * .018, duration: .8, ease: [0.22, 1, .36, 1] }}>{char === " " ? "\u00a0" : char}</motion.span>)}</h1>;

  if (variant === "split") return <h1 className={`${base} ${base}-split ${className}`}>{words.map((word, i) => <motion.span key={word + i} initial={{ opacity: 0, x: i % 2 ? 28 : -28 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .08, duration: .85, ease: [0.22, 1, .36, 1] }}>{word}{i < words.length - 1 ? " " : ""}</motion.span>)}</h1>;

  if (variant === "blur") return <motion.h1 className={`${base} ${base}-blur ${className}`} initial={{ opacity: 0, filter: "blur(18px)", scale: 1.035 }} animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }} transition={{ duration: 1.05, ease: [0.22, 1, .36, 1] }}>{title}</motion.h1>;

  if (variant === "outline") return <motion.h1 className={`${base} ${base}-outline ${className}`} initial={{ opacity: 0, backgroundPosition: "100% 0" }} animate={{ opacity: 1, backgroundPosition: "0% 0" }} transition={{ duration: 1.15, ease: [0.22, 1, .36, 1] }}>{title}</motion.h1>;

  if (variant === "mask" || variant === "wipe") return <div className={`${base}-mask ${className}`}><motion.h1 className={base} initial={{ x: "-8%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: .95, ease: [0.22, 1, .36, 1] }}>{title}</motion.h1></div>;

  if (variant === "fill" || variant === "scrollFill") return <ScrollFillTitle title={title} className={className} />;

  return <motion.h1 className={`${base} ${base}-cinematic ${className}`} initial={{ opacity: 0, y: 32, clipPath: "inset(100% 0 0 0)" }} animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }} transition={{ duration: 1, ease: [0.22, 1, .36, 1] }}>{title}</motion.h1>;
}

function ScrollFillTitle({ title, className }: { title: string; className: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(reduce ? 1 : .08);
  useEffect(() => {
    if (reduce) return;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(.06, 1 - (rect.top - window.innerHeight * .35) / (window.innerHeight * .72)));
      setProgress(p);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [reduce]);
  return <motion.h1 ref={ref} className={`${"motion-hero-title motion-hero-title-fill"} ${className}`} style={{ "--fill": `${progress * 100}%` } as React.CSSProperties} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [0.22, 1, .36, 1] }}>{title}</motion.h1>;
}
