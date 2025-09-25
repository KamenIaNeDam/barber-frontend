import { theme } from "@app/store";

export function toggleTheme() {
  theme.update((t) => (t === "light" ? "dark" : "light"));
}
