import { Suspense } from "react";
import LoginClient from "./LoginClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function LoginPage() {
  // useSearchParams() must be inside a Suspense boundary
  return (
    <Suspense fallback={<div className="min-h-screen bg-white/5" />}>
      <LoginClient />
    </Suspense>
  );
}
