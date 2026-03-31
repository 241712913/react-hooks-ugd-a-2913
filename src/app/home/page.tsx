'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Game1 from "../../components/Game1";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (isLogin !== "true") {
      router.replace('/auth/not-authorized');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Game1 />
    </div>
  );
}