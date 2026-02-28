import Link from "next/link";
import React from "react";

type Props =
  | ({ as?: "button" } & React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" })
  | ({ as: "link"; href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: "primary" | "secondary" | "ghost" });

export function Button(props: any) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:ring-offset-0 ";

  const variant =
    props.variant === "secondary"
      ? "border border-white/10 bg-white/5 text-white hover:bg-white/10"
      : props.variant === "ghost"
      ? "text-white/80 hover:bg-white/10 hover:text-white"
      : "bg-blue-600 text-white hover:bg-blue-500";

  const cls = base + variant;

  if (props.as === "link") {
    const { as, href, children, className, variant, ...rest } = props;
    return (
      <Link href={href} className={cls + " " + (className || "")} {...rest}>
        {children}
      </Link>
    );
  }

  const { as, children, className, variant: v, ...rest } = props;
  return (
    <button className={cls + " " + (className || "")} {...rest}>
      {children}
    </button>
  );
}
