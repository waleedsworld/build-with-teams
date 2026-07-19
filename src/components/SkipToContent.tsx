/**
 * A keyboard-only "skip to main content" link. It is the first focusable
 * element on the page and stays visually hidden until focused (see the
 * `.skip-to-content` styles in index.css). Activating it moves focus to the
 * <main id="main-content"> landmark so keyboard and screen-reader users can
 * bypass the repeated navigation on every route.
 */
export function SkipToContent({ targetId = "main-content" }: { targetId?: string }) {
  return (
    <a href={`#${targetId}`} className="skip-to-content">
      Skip to main content
    </a>
  );
}
