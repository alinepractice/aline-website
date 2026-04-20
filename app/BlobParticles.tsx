"use client";

import { useEffect, useRef } from "react";

const N = 500;
const BLOB_D = `M 283.957 519.5625 C 282.988 466.8086 304.902 410.4219 353.7266 366.0234 C 388.414 334.4805 429.1719 313.625 476.3594 308.9258 C 537.0742 302.8828 582.8828 328.1094 613.9141 379.9531 C 633.3516 412.418 639.6133 448.2852 637.5664 485.793 C 635.6523 520.8164 626.5273 554.2031 614.3203 586.8242 C 598.8398 628.1797 579.6328 667.6992 553.6992 703.6055 C 537.6563 725.8164 518.0859 744.4023 493.3789 756.8828 C 450.4531 778.5625 407.0156 773.1406 370.5625 741.8242 C 307.5273 687.6719 285.4219 599.4336 283.957 519.5625 Z`;
const VB_X = 246, VB_Y = 269, VB_W = 500, VB_H = 550;

type Pt = { sx: number; sy: number; tx: number; ty: number; delay: number; r: number };
const eio = (t: number) => t < 0.5 ? 4*t*t*t : 1-(-2*t+2)**3/2;
const lrp = (a: number, b: number, t: number) => a+(b-a)*t;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export default function BlobParticles() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const pts   = useRef<Pt[]>([]);
  const ready = useRef(false);
  const rafId = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cv  = cvRef.current!;
    const ctx = cv.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      cv.width  = window.innerWidth  * dpr;
      cv.height = window.innerHeight * dpr;
      cv.style.width  = `${window.innerWidth}px`;
      cv.style.height = `${window.innerHeight}px`;
      ready.current = false;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    function build() {
      const logoEl   = document.querySelector<SVGElement>("[data-hero-logo]");
      const headingEl = document.querySelector<HTMLElement>("[data-values-heading]");
      if (!logoEl || !headingEl) return;

      // ── Blob source ───────────────────────────────────────────────────
      const lr    = logoEl.getBoundingClientRect();
      const lPageY = lr.top + window.scrollY;
      const scX   = lr.width  / VB_W;
      const scY   = lr.height / VB_H;
      const offW  = Math.ceil(lr.width);
      const offH  = Math.ceil(lr.height);

      const offB = Object.assign(document.createElement("canvas"), { width: offW, height: offH });
      const bx   = offB.getContext("2d")!;
      bx.save();
      bx.translate(-VB_X * scX, -VB_Y * scY);
      bx.scale(scX, scY);
      bx.fill(new Path2D(BLOB_D));
      bx.restore();

      const bd = bx.getImageData(0, 0, offW, offH).data;
      const bPix: [number, number][] = [];
      for (let y = 0; y < offH; y += 3)
        for (let x = 0; x < offW; x += 3)
          if (bd[(y * offW + x) * 4 + 3] > 120) bPix.push([x, y]);

      // ── Text target ───────────────────────────────────────────────────
      const hr    = headingEl.getBoundingClientRect();
      const hPageY = hr.top + window.scrollY;
      const fs    = parseFloat(getComputedStyle(headingEl).fontSize);
      const lh    = fs * 1.45;
      const hW    = Math.ceil(hr.width);
      const hH    = Math.ceil(hr.height) + 8;

      const offT = Object.assign(document.createElement("canvas"), { width: hW, height: hH });
      const tx2  = offT.getContext("2d")!;
      tx2.font      = `300 ${fs}px 'Source Sans 3', sans-serif`;
      tx2.textBaseline = "top";
      tx2.textAlign    = "center";
      tx2.fillStyle    = "#000";

      const words = (headingEl.textContent || "").trim().split(/\s+/);
      const lines: string[] = [];
      let cur = "";
      for (const w of words) {
        const test = cur ? cur + " " + w : w;
        if (tx2.measureText(test).width > hW - 4) { if (cur) lines.push(cur); cur = w; }
        else cur = test;
      }
      if (cur) lines.push(cur);
      lines.forEach((l, i) => tx2.fillText(l, hW / 2, i * lh));

      const td = tx2.getImageData(0, 0, hW, hH).data;
      const tPix: [number, number][] = [];
      for (let y = 0; y < hH; y += 2)
        for (let x = 0; x < hW; x += 2)
          if (td[(y * hW + x) * 4 + 3] > 120) tPix.push([x, y]);

      if (!bPix.length || !tPix.length) return;

      pts.current = Array.from({ length: N }, () => {
        const bp = bPix[Math.random() * bPix.length | 0];
        const tp = tPix[Math.random() * tPix.length | 0];
        return {
          sx: lr.left   + bp[0],
          sy: lPageY    + bp[1],
          tx: hr.left   + tp[0],
          ty: hPageY    + tp[1],
          delay: Math.random() * 0.32,
          r: 1.2 + Math.random() * 1.6,
        };
      });
      ready.current = true;
    }

    document.fonts.ready.then(build);

    let prevScroll = -1;

    function frame() {
      rafId.current = requestAnimationFrame(frame);
      const scroll = window.scrollY;
      if (scroll === prevScroll) return;
      prevScroll = scroll;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cv.width / dpr, cv.height / dpr);
      if (!ready.current) return;

      const heroEl   = document.querySelector<HTMLElement>("[data-hero]");
      const valuesEl = document.getElementById("values-section");
      if (!heroEl || !valuesEl) return;

      const tStart = heroEl.offsetHeight * 0.3;
      const tEnd   = valuesEl.offsetTop  - window.innerHeight * 0.2;
      const prog   = clamp((scroll - tStart) / (tEnd - tStart), 0, 1);

      // Fade the SVG logo out as particles take over
      const logo = document.querySelector<SVGElement>("[data-hero-logo]");
      if (logo) logo.style.opacity = `${clamp(1 - prog * 3, 0, 1)}`;

      if (prog === 0 || prog === 1) return;

      for (const p of pts.current) {
        const lt    = clamp((prog - p.delay) / (1 - p.delay), 0, 1);
        const t     = eio(lt);
        const alpha = prog < 0.12 ? prog / 0.12 : prog > 0.82 ? (1 - prog) / 0.18 : 1;

        ctx.beginPath();
        ctx.arc(
          lrp(p.sx, p.tx, t),
          lrp(p.sy, p.ty, t) - scroll,
          p.r * (0.55 + t * 0.45),
          0, Math.PI * 2
        );
        ctx.fillStyle = `rgba(0,0,0,${alpha * 0.88})`;
        ctx.fill();
      }
    }

    frame();

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", resize);
      const logo = document.querySelector<SVGElement>("[data-hero-logo]");
      if (logo) logo.style.opacity = "1";
    };
  }, []);

  return (
    <canvas
      ref={cvRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 15 }}
    />
  );
}
