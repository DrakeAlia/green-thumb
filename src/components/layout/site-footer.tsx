import { siteConfig } from "@/config/site";

// SiteFooter, which represents the footer section of the website.
export function SiteFooter() {
  return (
    // Footer container with responsive padding
    <footer className="py-8 md:px-8 md:py-0">
      {/* Inner container for footer content */}
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        {/* Footer text content */}
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          {/* Credit to the builder */}
          Built by{" "}
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline text-primary underline-offset-4"
          >
            DrakeAlia
          </a>
          . The source code is available on{" "}
          {/* Link to the project's GitHub repository */}
          <a
            href={siteConfig.links.githubProject}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline text-primary underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
