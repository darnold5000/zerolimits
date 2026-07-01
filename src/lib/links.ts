export function isPlaceholderLink(href: string): boolean {
  return !href || href === "#" || href.trim() === "";
}

export function externalLinkProps(href: string) {
  if (isPlaceholderLink(href)) {
    return { href: "#", "aria-disabled": true as const };
  }
  const isExternal = href.startsWith("http");
  return {
    href,
    ...(isExternal
      ? { target: "_blank" as const, rel: "noopener noreferrer" as const }
      : {}),
  };
}
