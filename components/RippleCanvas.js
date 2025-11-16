"use client";

import { useEffect, useRef } from "react";

// These fallback hex codes mirror the design system's primary/secondary colors
// so that the animation still renders in predictable hues if CSS variables are
// unavailable (e.g., during SSR or before global styles load).
const FALLBACK_RIPPLE_COLORS = ["#9A211D", "#F5A741"];

const EMITTERS = [
    { anchorX: 0.5, anchorY: 0.5, maxRadiusRatio: 0.1, rateMultiplier: 1 },
    { anchorX: 0.2, anchorY: 0.5, maxRadiusRatio: 0.18 },
    { anchorX: 0.35, anchorY: 0.45, maxRadiusRatio: 0.13 },
    { anchorX: 0.3, anchorY: 0.3, maxRadiusRatio: 0.18 },
    { anchorX: 0.45, anchorY: 0.35, maxRadiusRatio: 0.13 },
    { anchorX: 0.5, anchorY: 0.2, maxRadiusRatio: 0.18 },
    { anchorX: 0.55, anchorY: 0.35, maxRadiusRatio: 0.13 },
    { anchorX: 0.7, anchorY: 0.3, maxRadiusRatio: 0.18 },
    { anchorX: 0.65, anchorY: 0.45, maxRadiusRatio: 0.13 },
    { anchorX: 0.8, anchorY: 0.5, maxRadiusRatio: 0.18 },
    { anchorX: 0.65, anchorY: 0.55, maxRadiusRatio: 0.13 },
    { anchorX: 0.7, anchorY: 0.7, maxRadiusRatio: 0.18 },
    { anchorX: 0.55, anchorY: 0.65, maxRadiusRatio: 0.13 },
    { anchorX: 0.5, anchorY: 0.8, maxRadiusRatio: 0.18 },
    { anchorX: 0.45, anchorY: 0.65, maxRadiusRatio: 0.13 },
    { anchorX: 0.3, anchorY: 0.7, maxRadiusRatio: 0.18 },
    { anchorX: 0.35, anchorY: 0.55, maxRadiusRatio: 0.13 },
];

const SPAWN_INTERVAL = 700;
const TRAVEL_DURATION = 3800;
const BASE_LINE_WIDTH = 2;
const GROUP_PULSE_DURATION = 850;
const GROUP_PULSE_MIN_OPACITY = 0.45;
const GROUP_PULSE_SPREAD = 0.85;

const srLabelId = "ripple-desc";

export default function RippleCanvas({ className = "" }) {
    const stageRef = useRef(null);
    const canvasRef = useRef(null);
    const renderSizeRef = useRef({ width: 0, height: 0 });

    useEffect(() => {
        // All rendering work happens inside this effect so we can safely access
        // browser-only APIs (canvas context, window size, computed styles, etc.)
        // while keeping the component compatible with Next.js' streaming SSR.
        const stage = stageRef.current;
        const canvas = canvasRef.current;
        if (!stage || !canvas) {
            return undefined;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return undefined;
        }

        const emitters = EMITTERS.map((emitter) => ({
            ...emitter,
            groupIndex: getGroupIndex(emitter.maxRadiusRatio),
            nextColorIndex: undefined,
            ripples: [],
            lastSpawn: 0,
        }));

        const groupCount =
            Math.max(...emitters.map((emitter) => emitter.groupIndex)) + 1;

        // Pull the latest palette from CSS custom properties; this lets design
        // tokens propagate into the canvas even though the canvas API doesn't
        // understand CSS variables directly.
        const rippleColors = getRippleColors();

        let dpr = window.devicePixelRatio || 1;
        let lastTime = performance.now();
        let animationFrameId;

        const resizeCanvas = () => {
            if (!stage) {
                return;
            }
            const width = Math.max(stage.clientWidth, 0);
            const height = Math.max(stage.clientHeight, 0);
            renderSizeRef.current = { width, height };

            dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const spawnRipple = (emitter, offset = 0) => {
            emitter.nextColorIndex = emitter.nextColorIndex ?? 0;
            const colorIndex = emitter.nextColorIndex;
            const colorRgb = rippleColors[colorIndex] ?? { r: 0, g: 0, b: 0 };
            emitter.nextColorIndex = (colorIndex + 1) % rippleColors.length;
            emitter.ripples.push({ progress: offset, colorRgb });
        };

        const render = (time) => {
            const delta = time - lastTime;
            lastTime = time;
            const { width, height } = renderSizeRef.current;
            if (!width || !height) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            ctx.clearRect(0, 0, width, height);
            ctx.lineWidth = BASE_LINE_WIDTH / dpr;

            const groupSpan = Math.max(groupCount - 1, 1);
            const groupCycleDuration = GROUP_PULSE_DURATION * groupSpan * 2;
            const cycleProgress =
                groupCycleDuration === 0
                    ? 0
                    : ((time % groupCycleDuration) / groupCycleDuration) *
                    groupSpan *
                    2;
            const travelPosition =
                cycleProgress <= groupSpan
                    ? cycleProgress
                    : groupSpan * 2 - cycleProgress;

            emitters.forEach((emitter) => {
                const rateMultiplier = emitter.rateMultiplier ?? 1;
                const emitterInterval = SPAWN_INTERVAL / rateMultiplier;

                while (time - emitter.lastSpawn > emitterInterval) {
                    spawnRipple(emitter);
                    emitter.lastSpawn += emitterInterval;
                }

                const centerX = width * emitter.anchorX;
                const centerY = height * emitter.anchorY;
                const maxRadius =
                    Math.min(width, height) * emitter.maxRadiusRatio;

                for (let i = emitter.ripples.length - 1; i >= 0; i -= 1) {
                    const ripple = emitter.ripples[i];
                    ripple.progress += delta / TRAVEL_DURATION;

                    if (ripple.progress >= 1) {
                        emitter.ripples.splice(i, 1);
                        continue;
                    }

                    const radius = ripple.progress * maxRadius;
                    const travelFade = Math.max(1 - ripple.progress, 0);
                    const distance = Math.abs(emitter.groupIndex - travelPosition);
                    const gaussian =
                        GROUP_PULSE_SPREAD <= 0
                            ? Number(distance === 0)
                            : Math.exp(
                                -(distance ** 2) /
                                (2 *
                                    GROUP_PULSE_SPREAD *
                                    GROUP_PULSE_SPREAD),
                            );
                    const groupPulseStrength = Math.min(
                        Math.max(gaussian, 0),
                        1,
                    );
                    const groupOpacity =
                        GROUP_PULSE_MIN_OPACITY +
                        (1 - GROUP_PULSE_MIN_OPACITY) * groupPulseStrength;
                    const alpha = travelFade * groupOpacity;
                    const { r, g, b } = ripple.colorRgb ?? {
                        r: 0,
                        g: 0,
                        b: 0,
                    };

                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                    ctx.stroke();
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        const init = () => {
            resizeCanvas();
            window.addEventListener("resize", resizeCanvas);

            const prefill = 4;
            emitters.forEach((emitter) => {
                const rateMultiplier = emitter.rateMultiplier ?? 1;
                const totalPrefill = prefill * rateMultiplier;
                for (let i = 0; i < totalPrefill; i += 1) {
                    spawnRipple(emitter, (i + 1) / totalPrefill);
                }
            });

            lastTime = performance.now();
            animationFrameId = requestAnimationFrame(render);
        };

        init();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <div
            ref={stageRef}
            role="img"
            aria-labelledby={srLabelId}
            className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
        >
            <span id={srLabelId} className="sr-only">
                Looping concentric ripple animation
            </span>
            <canvas ref={canvasRef} className="block" />
        </div>
    );
}

function getGroupIndex(maxRadiusRatio) {
    if (maxRadiusRatio <= 0.11) return 0;
    if (maxRadiusRatio <= 0.15) return 1;
    return 2;
}

/**
 * Reads the brand colors from CSS variables and returns them as RGB objects
 * that are ready for the canvas API. Falls back to the hard-coded palette if
 * global styles are missing (e.g., during SSR or unit tests).
 */
function getRippleColors() {
    return resolvePaletteFromCss().map(cssColorToRgb);
}

/**
 * Resolves the ordered list of ripple colors directly from the root element's
 * computed styles. This keeps the animation in sync with the design tokens
 * without duplicating values in JavaScript.
 */
function resolvePaletteFromCss() {
    if (typeof window === "undefined" || !document?.documentElement) {
        return FALLBACK_RIPPLE_COLORS;
    }

    const styles = getComputedStyle(document.documentElement);
    const secondary =
        styles.getPropertyValue("--color-secondary").trim() ||
        FALLBACK_RIPPLE_COLORS[0];
    const primary =
        styles.getPropertyValue("--color-primary").trim() ||
        FALLBACK_RIPPLE_COLORS[1];

    return [secondary, primary];
}

/**
 * Converts either a hex or rgb() string into an { r, g, b } triple that the
 * canvas context can consume. Any unsupported input gracefully falls back to
 * the first color in the palette so the animation never crashes.
 */
function cssColorToRgb(value) {
    if (typeof value !== "string") {
        return hexToRgb(FALLBACK_RIPPLE_COLORS[0]);
    }

    const color = value.trim();
    if (color.startsWith("#")) {
        return hexToRgb(color);
    }

    const rgbMatch = color.match(
        /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i,
    );
    if (rgbMatch) {
        return {
            r: clampChannel(parseInt(rgbMatch[1], 10)),
            g: clampChannel(parseInt(rgbMatch[2], 10)),
            b: clampChannel(parseInt(rgbMatch[3], 10)),
        };
    }

    return hexToRgb(FALLBACK_RIPPLE_COLORS[0]);
}

/**
 * Ensures every RGB channel stays within the [0, 255] range to avoid invalid
 * color values being fed into the canvas context.
 */
function clampChannel(value) {
    if (Number.isNaN(value)) {
        return 0;
    }
    return Math.max(0, Math.min(255, value));
}

/**
 * Minimal hex parser that supports 3- or 6-digit formats and returns an RGB
 * triple. Used as the final conversion step after we normalize inputs.
 */
function hexToRgb(hex) {
    let normalized = hex.replace("#", "");
    if (normalized.length === 3) {
        normalized = normalized
            .split("")
            .map((char) => char + char)
            .join("");
    }
    const intVal = parseInt(normalized, 16);
    return {
        r: (intVal >> 16) & 255,
        g: (intVal >> 8) & 255,
        b: intVal & 255,
    };
}


