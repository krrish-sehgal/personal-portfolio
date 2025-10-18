import site from "@/data/site.json";
import type React from "react";

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.12-1.49-1.12-1.49-.92-.64.07-.63.07-.63 1.02.07 1.56 1.07 1.56 1.07.9 1.58 2.36 1.12 2.93.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.7 0 0 .85-.28 2.77 1.05A9.3 9.3 0 0 1 12 7.1c.86 0 1.73.12 2.54.35 1.92-1.34 2.76-1.05 2.76-1.05.55 1.4.2 2.44.1 2.7.65.72 1.03 1.64 1.03 2.76 0 3.93-2.34 4.8-4.57 5.05.36.31.68.92.68 1.86 0 1.35-.01 2.43-.01 2.76 0 .27.18.6.69.5A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"
      />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M20.9 3.5c-1 .6-2.1 1-3.2 1.2a3.8 3.8 0 0 0-6.5 3.4A10.8 10.8 0 0 1 3 4.6a3.8 3.8 0 0 0 1.2 5.1c-.8 0-1.5-.3-2.1-.7v.1a3.8 3.8 0 0 0 3 3.7c-.4.1-.8.2-1.3.2-.3 0-.6 0-.9-.1a3.8 3.8 0 0 0 3.6 2.7A7.6 7.6 0 0 1 2 18.6a10.7 10.7 0 0 0 5.8 1.7c7 0 10.8-5.9 10.8-11 0-.2 0-.3 0-.5a7.8 7.8 0 0 0 1.9-2z"
      />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5 1.9 1.5 3 1.5s2 .9 2 2zM1.2 8.5h3.6v13.1H1.2zM8.1 8.5h3.4v1.8h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6v7.2h-3.6v-6.4c0-1.5 0-3.5-2.1-3.5-2.1 0-2.4 1.6-2.4 3.4v6.5H8.1z"
      />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
      />
    </svg>
  );
}

function ExternalLinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"
      />
    </svg>
  );
}

function NostrIcon(props: React.SVGProps<SVGSVGElement>) {
  // simple star-like mark as placeholder
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M12 2l2.4 6.9L22 10l-5.5 4 1.9 7L12 17l-6.4 4 1.9-7L2 10l7.6-1.1z"
      />
    </svg>
  );
}

export function ImportantLinks() {
  const L = site.contact;
  const links = [
    L.github ? { label: "GitHub", href: L.github, Icon: GitHubIcon } : null,
    L.twitter ? { label: "Twitter", href: L.twitter, Icon: TwitterIcon } : null,
    L.linkedin
      ? { label: "LinkedIn", href: L.linkedin, Icon: LinkedInIcon }
      : null,
    L.nostrNpub
      ? {
          label: "Nostr",
          href: `https://njump.me/${L.nostrNpub}`,
          Icon: NostrIcon,
        }
      : null,
    L.email
      ? { label: "Email", href: `mailto:${L.email}`, Icon: MailIcon }
      : null,
    site.hero?.primaryCta?.url
      ? {
          label: site.hero.primaryCta.label,
          href: site.hero.primaryCta.url,
          Icon: ExternalLinkIcon,
        }
      : null,
    site.writing?.[0]?.link
      ? { label: "Medium", href: site.writing[0].link, Icon: ExternalLinkIcon }
      : null,
  ].filter(Boolean) as {
    label: string;
    href: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  }[];

  return (
    <div className="w-full max-w-none">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-foreground mb-3">
          Important Links
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with me and explore my work
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 w-full">
        {links.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-[#F7931A] hover:shadow-lg hover:shadow-[#F7931A]/10"
            aria-label={label}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-secondary p-2 text-foreground group-hover:text-[#F7931A] group-hover:bg-[#F7931A]/10 transition-all">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-xs text-muted-foreground">
                  tx
                </div>
                <div className="font-semibold">{label}</div>
              </div>
            </div>
            <div className="mt-3 rounded-md bg-muted p-3 font-mono text-xs text-muted-foreground">
              0x{"{"}
              {label
                .toLowerCase()
                .replace(/[^a-z]/g, "")
                .padEnd(8, "0")}
              {"}"}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
