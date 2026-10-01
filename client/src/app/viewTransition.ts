import { startTransition } from "react";

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function transitionUpdate(update: () => void) {
  if (prefersReducedMotion()) {
    update();
    return;
  }
  startTransition(update);
}
