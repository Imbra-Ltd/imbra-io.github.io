// Plausible's script defines this global; both the contact form and the
// mailto listener report through it.
interface Window {
  plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
}
