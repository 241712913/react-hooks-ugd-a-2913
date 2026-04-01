'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Game1 from "../../components/Game1";

export default function Home() {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);
  const [checking, setChecking] = useState(true); 

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (isLogin) {
      setIsAllowed(true);
    } else {
      router.replace('/auth/not-authorized');
    }

    setChecking(false);
  }, [router]);

  if (checking) return null;

  if (!isAllowed) return null;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Game1 />
    </div>
  );
}