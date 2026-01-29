"use client";

import { useRouter } from "next/navigation";
import { LuLoaderCircle } from "react-icons/lu";

export default function Home() {
  const router = useRouter();

  setTimeout(() => router.push(`/site/padisquare`), 5000);
  return (
    <div className={`h-screen w-full flex items-center justify-center px-3`}>
      <LuLoaderCircle size={24} className={`animate-spin`} />
    </div>
  );
}
