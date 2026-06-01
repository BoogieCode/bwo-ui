'use client';

import { createMagneticCursor, type MagneticCursorOptions } from '@bwo-ui/core';
import { useEffect } from 'react';

export interface MagneticCursorProps extends MagneticCursorOptions {}

/**
 * Mount once at the root of your app to enable a custom magnetic cursor that
 * follows the pointer and grows on interactive elements. Renders nothing.
 *
 * No-ops on touch devices.
 */
export function MagneticCursor(options: MagneticCursorProps) {
  useEffect(() => {
    const instance = createMagneticCursor(options);
    return () => instance.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    options.size,
    options.hoverSize,
    options.color,
    options.hoverColor,
    options.duration,
    options.hoverSelector,
    options.hideNativeCursor,
  ]);
  return null;
}
