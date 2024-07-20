import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "framer-motion";

interface VortexProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
}

// Functions that don't depend on props or state can be declared outside the component
const HALF_PI: number = 0.5 * Math.PI;
const TAU: number = 2 * Math.PI;
const TO_RAD: number = Math.PI / 180;
const rand = (n: number): number => n * Math.random();
const randRange = (n: number): number => n - rand(2 * n);
const fadeInOut = (t: number, m: number): number => {
  let hm = 0.5 * m;
  return Math.abs(((t + hm) % m) - hm) / hm;
};
const lerp = (n1: number, n2: number, speed: number): number =>
  (1 - speed) * n1 + speed * n2;

export const Vortex = (props: VortexProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef(null);
  const centerRef = useRef<[number, number]>([0, 0]);
  const tickRef = useRef(0);
  const particlePropsRef = useRef(
    new Float32Array(props.particleCount || 700 * 9)
  );
  const particleCount = props.particleCount || 700;
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  const rangeY = props.rangeY || 100;
  const baseTTL = 50;
  const rangeTTL = 150;
  const baseSpeed = props.baseSpeed || 0.0;
  const rangeSpeed = props.rangeSpeed || 1.5;
  const baseRadius = props.baseRadius || 1;
  const rangeRadius = props.rangeRadius || 2;
  const baseHue = props.baseHue || 220;
  const rangeHue = 100;
  const noiseSteps = 3;
  const xOff = 0.00125;
  const yOff = 0.00125;
  const zOff = 0.0005;
  const backgroundColor = props.backgroundColor || "#000000";
  const noise3D = createNoise3D();

  const initParticle = useCallback(
    (i: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      let x, y, vx, vy, life, ttl, speed, radius, hue;

      x = rand(canvas.width);
      y = centerRef.current[1] + randRange(rangeY);
      vx = 0;
      vy = 0;
      life = 0;
      ttl = baseTTL + rand(rangeTTL);
      speed = baseSpeed + rand(rangeSpeed);
      radius = baseRadius + rand(rangeRadius);
      hue = baseHue + rand(rangeHue);

      particlePropsRef.current.set(
        [x, y, vx, vy, life, ttl, speed, radius, hue],
        i
      );
    },
    [
      rangeY,
      baseTTL,
      rangeTTL,
      baseSpeed,
      rangeSpeed,
      baseRadius,
      rangeRadius,
      baseHue,
      rangeHue,
    ]
  );

  const initParticles = useCallback(() => {
    tickRef.current = 0;
    particlePropsRef.current = new Float32Array(particlePropsLength);

    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }
  }, [initParticle, particlePropsLength, particlePropCount]);

  const drawParticle = useCallback(
    (
      x: number,
      y: number,
      x2: number,
      y2: number,
      life: number,
      ttl: number,
      radius: number,
      hue: number,
      ctx: CanvasRenderingContext2D
    ) => {
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineWidth = radius;
      ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    },
    []
  );

  const checkBounds = useCallback(
    (x: number, y: number, canvas: HTMLCanvasElement) => {
      return x > canvas.width || x < 0 || y > canvas.height || y < 0;
    },
    []
  );

  const updateParticle = useCallback(
    (i: number, ctx: CanvasRenderingContext2D) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      let i2 = 1 + i,
        i3 = 2 + i,
        i4 = 3 + i,
        i5 = 4 + i,
        i6 = 5 + i,
        i7 = 6 + i,
        i8 = 7 + i,
        i9 = 8 + i;
      let n, x, y, vx, vy, life, ttl, speed, x2, y2, radius, hue;

      x = particlePropsRef.current[i];
      y = particlePropsRef.current[i2];
      n =
        noise3D(x * xOff, y * yOff, tickRef.current * zOff) * noiseSteps * TAU;
      vx = lerp(particlePropsRef.current[i3], Math.cos(n), 0.5);
      vy = lerp(particlePropsRef.current[i4], Math.sin(n), 0.5);
      life = particlePropsRef.current[i5];
      ttl = particlePropsRef.current[i6];
      speed = particlePropsRef.current[i7];
      x2 = x + vx * speed;
      y2 = y + vy * speed;
      radius = particlePropsRef.current[i8];
      hue = particlePropsRef.current[i9];

      drawParticle(x, y, x2, y2, life, ttl, radius, hue, ctx);

      life++;

      particlePropsRef.current[i] = x2;
      particlePropsRef.current[i2] = y2;
      particlePropsRef.current[i3] = vx;
      particlePropsRef.current[i4] = vy;
      particlePropsRef.current[i5] = life;

      (checkBounds(x, y, canvas) || life > ttl) && initParticle(i);
    },
    [
      drawParticle,
      initParticle,
      noise3D,
      xOff,
      yOff,
      zOff,
      noiseSteps,
      checkBounds,
    ]
  );

  const drawParticles = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        updateParticle(i, ctx);
      }
    },
    [updateParticle, particlePropsLength, particlePropCount]
  );

  const renderGlow = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      ctx.save();
      ctx.filter = "blur(8px) brightness(200%)";
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(canvas, 0, 0);
      ctx.restore();

      ctx.save();
      ctx.filter = "blur(4px) brightness(200%)";
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(canvas, 0, 0);
      ctx.restore();
    },
    []
  );

  const renderToScreen = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(canvas, 0, 0);
      ctx.restore();
    },
    []
  );

  const draw = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      tickRef.current++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawParticles(ctx);
      renderGlow(canvas, ctx);
      renderToScreen(canvas, ctx);

      window.requestAnimationFrame(() => draw(canvas, ctx));
    },
    [backgroundColor, drawParticles, renderGlow, renderToScreen]
  );

  const resize = useCallback(
    (canvas: HTMLCanvasElement, ctx?: CanvasRenderingContext2D) => {
      const { innerWidth, innerHeight } = window;

      canvas.width = innerWidth;
      canvas.height = innerHeight;

      centerRef.current = [0.5 * canvas.width, 0.5 * canvas.height];
    },
    []
  );

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        resize(canvas, ctx);
        initParticles();
        draw(canvas, ctx);
      }
    }
  }, [resize, initParticles, draw]);

  useEffect(() => {
    setup();
    const handleResize = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) {
        resize(canvas, ctx);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setup, resize]);

  return (
    <div className={cn("relative h-full w-full", props.containerClassName)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={containerRef}
        className="absolute h-full w-full inset-0 z-0 bg-transparent flex items-center justify-center"
      >
        <canvas ref={canvasRef}></canvas>
      </motion.div>

      <div className={cn("relative z-10", props.className)}>
        {props.children}
      </div>
    </div>
  );
};
