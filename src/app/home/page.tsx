'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Game1 from "../../components/Game1";

export default function Home() {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);   // tambahan ini

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (isLogin === "true") {
      setIsAllowed(true);        // izinkan tampil game
    } else {
      router.replace('/auth/not-authorized');
    }
  }, [router]);

  // Kalau belum dikonfirmasi login, jangan render Game1 sama sekali
  if (!isAllowed) {
    return null;                 // ← ini yang membuat tidak ada flash
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Game1 />
    </div>
  );
}