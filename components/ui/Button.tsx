import Link from "next/link";
import React from "react";

type Props =
  | ({ as?: "button" } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: "link"; href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>);

export function Button(props: any) {
  const cls =
    "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold " +
    "transition shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-slate-300 " +
    (props.variant === "secondary"
      ? "border bg-white text-slate-900 hover:bg-slate-50"
      : props.variant === "ghost"
      ? "text-slate-900 hover:bg-slate-100"
      : "bg-slate-900 text-white hover:bg-slate-800");

  if (props.as === "link") {
    const { as, href, children, className, ...rest } = props;
    return (
      <Link href={href} className={cls + " " + (className || "")} {...rest}>
        {children}
      </Link>
    );
  }

  const { as, children, className, ...rest } = props;
  return (
    <button className={cls + " " + (className || "")} {...rest}>
      {children}
    </button>
  );
}
