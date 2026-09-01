import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type MotionVariant =
  | "fill"
  | "mask"
  | "drift"
  | "blur"
  | "outline"
  | "split"
  | "scrollFill"
  | "parallax"
  | "wipe"
  | "cinematic";

const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  className = "",
  delay = 0,
  distance = 34,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={
        reduce ? false : { opacity: 0, y: distance, filter: "blur(7px)" }
      }
      whileInView={
        reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 1.05, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className = "",
  delay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
      }}
      initial={reduce ? false : undefined}
    >
      {children}
    </motion.div>
  );
}

export function MotionHeroTitle({
  title,
  variant = "cinematic",
  className = "",
}: {
  title: string;
  variant?: MotionVariant;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const words = title.split(" ");
  const chars = Array.from(title);
  const base = "motion-hero-title";
  if (reduce) return <h1 className={`${base} ${className}`}>{title}</h1>;

  if (variant === "drift")
    return (
      <h1 className={`${base} ${base}-drift ${className}`}>
        {chars.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            style={{ display: char === " " ? "inline" : "inline-block" }}
            initial={{
              opacity: 0,
              x: i % 2 ? 16 : -16,
              y: i % 3 === 0 ? -10 : 10,
            }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: i * 0.024, duration: 1.15, ease }}
          >
            {char === " " ? "\u00a0" : char}
          </motion.span>
        ))}
      </h1>
    );

  if (variant === "split")
    return (
      <h1 className={`${base} ${base}-split ${className}`}>
        {words.map((word, i) => (
          <motion.span
            key={word + i}
            initial={{ opacity: 0, y: 35, rotateX: -18 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: i * 0.11, duration: 1.05, ease }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </h1>
    );

  if (variant === "blur")
    return (
      <motion.h1
        className={`${base} ${base}-blur ${className}`}
        initial={{ opacity: 0, filter: "blur(22px)", scale: 1.045, y: 18 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
        transition={{ duration: 1.25, ease }}
      >
        {title}
      </motion.h1>
    );

  if (variant === "outline")
    return (
      <motion.h1
        className={`${base} ${base}-outline ${className}`}
        initial={{
          opacity: 0,
          backgroundPosition: "100% 0",
          letterSpacing: ".02em",
        }}
        animate={{
          opacity: 1,
          backgroundPosition: "0% 0",
          letterSpacing: "-.045em",
        }}
        transition={{ duration: 1.45, ease }}
      >
        {title}
      </motion.h1>
    );

  if (variant === "mask" || variant === "wipe")
    return (
      <div className={`${base}-mask ${className}`}>
        <motion.h1
          className={base}
          initial={{ x: "-13%", opacity: 0, skewX: -2 }}
          animate={{ x: 0, opacity: 1, skewX: 0 }}
          transition={{ duration: 1.25, ease }}
        >
          {title}
        </motion.h1>
      </div>
    );

  if (variant === "fill" || variant === "scrollFill")
    return <ScrollFillTitle title={title} className={className} />;

  if (variant === "parallax")
    return <ParallaxTitle title={title} className={className} />;

  return (
    <motion.h1
      className={`${base} ${base}-cinematic ${className}`}
      initial={{
        opacity: 0,
        y: 42,
        clipPath: "inset(100% 0 0 0)",
        letterSpacing: ".01em",
      }}
      animate={{
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0 0 0)",
        letterSpacing: "-.055em",
      }}
      transition={{ duration: 1.35, ease }}
    >
      {title}
    </motion.h1>
  );
}

function ScrollFillTitle({
  title,
  className,
}: {
  title: string;
  className: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(reduce ? 1 : 0.06);
  useEffect(() => {
    if (reduce) return;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const p = Math.min(
        1,
        Math.max(
          0.06,
          1 -
            (rect.top - window.innerHeight * 0.32) / (window.innerHeight * 0.9)
        )
      );
      setProgress(p);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduce]);
  return (
    <motion.h1
      ref={ref}
      className={`${"motion-hero-title motion-hero-title-fill"} ${className}`}
      style={{ "--fill": `${progress * 100}%` } as React.CSSProperties}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.15, ease }}
    >
      {title}
    </motion.h1>
  );
}

function ParallaxTitle({
  title,
  className,
}: {
  title: string;
  className: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -24]);
  return (
    <motion.div ref={ref} style={{ y }}>
      <h1
        className={`${"motion-hero-title motion-hero-title-cinematic"} ${className}`}
      >
        {title}
      </h1>
    </motion.div>
  );
}

export function MagneticButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -4, scale: 1.015 }}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.45, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
