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
      setIsAllowed(true);        
    } else {
      router.replace('/auth/not-authorized');
    }
  }, [router]);

  if (!isAllowed) {
    return null; 
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Game1 />
    </div>
  );
}