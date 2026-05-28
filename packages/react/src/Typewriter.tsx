'use client';

import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
} from 'react';
import { cn } from './utils';

export interface TypewriterLine {
  /** The line of text to type out. */
  text: string;
  /**
   * When true, after the line finishes revealing a strikethrough bar
   * animates across it (the "crossed out" pattern).
   */
  strike?: boolean;
  /** Optional per-line colour override (e.g. accent on the final line). */
  color?: string;
}

export interface TypewriterProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Tag to render. Default: `'h1'`. */
  as?: ElementType;
  /** Lines to type, in order. */
  lines: TypewriterLine[];
  /** Seconds between each character. Default: `0.032`. */
  charSpeed?: number;
  /** Seconds between the end of one line and the first char of the next. Default: `0.18`. */
  lineGap?: number;
  /** Seconds between a `strike` line finishing reveal and the strike bar starting. Default: `0.22`. */
  strikeWait?: number;
  /** Initial delay before the first character animates in. Default: `0.12`. */
  initialDelay?: number;
  /** Per-character reveal duration. Default: `0.6`. */
  charDuration?: number;
  /** CSS easing for the character reveal. Default: `'cubic-bezier(.16,1,.3,1)'`. */
  charEase?: string;
  /** Strike-bar growth duration. Default: `0.5`. */
  strikeDuration?: number;
  /** CSS easing for the strike bar. Default: `'cubic-bezier(.4,0,.2,1)'`. */
  strikeEase?: string;
  /** Initial Y offset in px (each char rises from here). Default: `30`. */
  fromY?: number;
}

/**
 * Char-by-char typewriter with optional per-line strikethrough — replicates
 * the boogie.ro hero where two lines are "crossed out" before the final
 * accent line lands.
 *
 *   "· site tip 2010"    (strike)
 *   "· site generic AI"  (strike)
 *   "· site memorabil"   (accent, no strike)
 *
 * Each char gets its own `animation-delay` (computed cumulatively) so the
 * full sequence is coordinated without any JS timeline. Strike timing fires
 * via `setTimeout` per line after its last char finishes revealing.
 */
export function Typewriter({
  as,
  lines,
  charSpeed = 0.032,
  lineGap = 0.18,
  strikeWait = 0.22,
  initialDelay = 0.12,
  charDuration = 0.6,
  charEase = 'cubic-bezier(0.16, 1, 0.3, 1)',
  strikeDuration = 0.5,
  strikeEase = 'cubic-bezier(0.4, 0, 0.2, 1)',
  fromY = 30,
  className,
  style,
  ...rest
}: TypewriterProps) {
  const Tag = (as ?? 'h1') as ElementType;
  const [strikingIdx, setStrikingIdx] = useState<Set<number>>(() => new Set());

  // Per-line timing: start offset + strike-start offset
  const lineMeta = useMemo(() => {
    let cursor = initialDelay;
    return lines.map((line) => {
      const startAt = cursor;
      const lineEnd = cursor + line.text.length * charSpeed;
      const strikeStartAt = line.strike ? lineEnd + strikeWait : null;
      cursor = lineEnd + lineGap;
      return { startAt, strikeStartAt };
    });
  }, [lines, charSpeed, lineGap, strikeWait, initialDelay]);

  useEffect(() => {
    setStrikingIdx(new Set());
    const timers: number[] = [];
    lineMeta.forEach((m, i) => {
      if (m.strikeStartAt === null) return;
      timers.push(
        window.setTimeout(() => {
          setStrikingIdx((prev) => {
            const next = new Set(prev);
            next.add(i);
            return next;
          });
        }, m.strikeStartAt * 1000),
      );
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [lineMeta]);

  const rootStyle: CSSProperties = {
    ['--bwo-tw-char-duration' as never]: `${charDuration}s`,
    ['--bwo-tw-char-ease' as never]: charEase,
    ['--bwo-tw-strike-duration' as never]: `${strikeDuration}s`,
    ['--bwo-tw-strike-ease' as never]: strikeEase,
    ['--bwo-tw-from-y' as never]: `${fromY}px`,
    ...style,
  };

  return (
    <Tag className={cn('bwo-tw', className)} style={rootStyle} {...rest}>
      {lines.map((line, lineIdx) => {
        const meta = lineMeta[lineIdx]!;
        const isStriking = strikingIdx.has(lineIdx);
        return (
          <span key={lineIdx}>
            <span
              className={cn(
                'bwo-tw-line',
                line.strike && 'bwo-tw-line--strike',
                isStriking && 'is-striking',
              )}
              style={line.color ? { color: line.color } : undefined}
            >
              {line.text.split('').map((ch, charIdx) => (
                <span
                  key={charIdx}
                  className="bwo-tw-char"
                  style={{
                    animationDelay: `${(meta.startAt + charIdx * charSpeed).toFixed(3)}s`,
                  }}
                >
                  {ch === ' ' ? ' ' : ch}
                </span>
              ))}
            </span>
            {lineIdx < lines.length - 1 && <br />}
          </span>
        );
      })}
    </Tag>
  );
}
