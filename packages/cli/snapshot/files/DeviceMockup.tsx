'use client';

import {
  forwardRef,
  useInsertionEffect,
  type HTMLAttributes,
} from 'react';
import { cn } from './utils';

export type DeviceVariant = 'browser' | 'phone' | 'tablet';

export interface DeviceMockupProps extends HTMLAttributes<HTMLDivElement> {
  /** Which device frame to render. Default `'browser'`. */
  variant?: DeviceVariant;
  /** Address-bar text shown in the `'browser'` variant. Default `'example.com'`. */
  url?: string;
}

const STYLE_ID = 'bwo-device-mockup-styles';

const STYLES = `
.bwo-device {
  display: inline-block;
  max-width: 100%;
  box-sizing: border-box;
}

.bwo-device *,
.bwo-device *::before,
.bwo-device *::after {
  box-sizing: border-box;
}

/* ---------- Browser variant ---------- */
.bwo-device--browser {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: var(--bwo-device-chrome, #1e1e22);
  border: 1px solid var(--bwo-device-bezel, #2a2a30);
  box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.5);
}

.bwo-device__bar {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 40px;
  padding: 0 14px;
  background: var(--bwo-device-chrome, #1e1e22);
  border-bottom: 1px solid var(--bwo-device-bezel, #2a2a30);
}

.bwo-device__dots {
  display: flex;
  gap: 7px;
  flex: none;
}

.bwo-device__dot {
  width: 11px;
  height: 11px;
  border-radius: 9999px;
  background: #4b4b52;
}

.bwo-device__dot:nth-child(1) {
  background: #ff5f57;
}
.bwo-device__dot:nth-child(2) {
  background: #febc2e;
}
.bwo-device__dot:nth-child(3) {
  background: #28c840;
}

.bwo-device__pill {
  flex: 1 1 auto;
  min-width: 0;
  height: 22px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 9999px;
  background: var(--bwo-device-screen, #0c0c0f);
  color: #9a9aa3;
  font: 12px/1
    var(--bwo-font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bwo-device__screen {
  position: relative;
  width: 100%;
  background: var(--bwo-device-screen, #0c0c0f);
  overflow: hidden;
}

/* ---------- Phone / tablet variants ---------- */
.bwo-device--phone,
.bwo-device--tablet {
  position: relative;
  padding: var(--bwo-device-bezel-w, 12px);
  background: var(--bwo-device-bezel, #18181b);
  box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.5);
}

.bwo-device--phone {
  width: 300px;
  border-radius: 40px;
}

.bwo-device--tablet {
  width: 480px;
  border-radius: 28px;
}

/* The notch — a pill sitting over the top bezel. */
.bwo-device--phone .bwo-device__notch,
.bwo-device--tablet .bwo-device__notch {
  position: absolute;
  top: var(--bwo-device-bezel-w, 12px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  height: 22px;
  border-radius: 0 0 14px 14px;
  background: var(--bwo-device-bezel, #18181b);
}

.bwo-device--phone .bwo-device__notch {
  width: 44%;
}

.bwo-device--tablet .bwo-device__notch {
  width: 26%;
  height: 16px;
}

.bwo-device--phone .bwo-device__screen,
.bwo-device--tablet .bwo-device__screen {
  aspect-ratio: var(--bwo-device-aspect);
}

.bwo-device--phone .bwo-device__screen {
  --bwo-device-aspect: 9 / 19.5;
  border-radius: 28px;
}

.bwo-device--tablet .bwo-device__screen {
  --bwo-device-aspect: 4 / 3;
  border-radius: 14px;
}

/* Inner media fills the screen area. */
.bwo-device__screen > img,
.bwo-device__screen > video,
.bwo-device__screen > picture {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`;

let injected = false;

function useDeviceMockupStyles() {
  // useInsertionEffect runs before layout effects and is the correct place to
  // inject style rules. On the server it is a no-op (SSR-safe); the styles are
  // injected on the client during hydration. Guarded by id + module flag so the
  // <style> is added at most once regardless of how many mockups mount.
  useInsertionEffect(() => {
    if (injected || typeof document === 'undefined') return;
    if (document.getElementById(STYLE_ID)) {
      injected = true;
      return;
    }
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = STYLES;
    document.head.appendChild(el);
    injected = true;
  }, []);
}

/**
 * Wraps content (a screenshot, `<img>`, or any children) in a pure-CSS device
 * frame for hero product shots. `'browser'` renders window chrome with three
 * traffic-light dots and a URL pill; `'phone'` / `'tablet'` render a rounded
 * bezel with a notch. No images are used — the frame is entirely CSS.
 */
export const DeviceMockup = forwardRef<HTMLDivElement, DeviceMockupProps>(
  function DeviceMockup(
    { variant = 'browser', url = 'example.com', className, children, ...props },
    ref,
  ) {
    useDeviceMockupStyles();

    if (variant === 'browser') {
      return (
        <div
          ref={ref}
          className={cn('bwo-device', 'bwo-device--browser', className)}
          {...props}
        >
          <div className="bwo-device__bar">
            <div className="bwo-device__dots" aria-hidden="true">
              <span className="bwo-device__dot" />
              <span className="bwo-device__dot" />
              <span className="bwo-device__dot" />
            </div>
            <div className="bwo-device__pill">{url}</div>
          </div>
          <div className="bwo-device__screen">{children}</div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('bwo-device', `bwo-device--${variant}`, className)}
        {...props}
      >
        <span className="bwo-device__notch" aria-hidden="true" />
        <div className="bwo-device__screen">{children}</div>
      </div>
    );
  },
);
