'use client';

import { useRouter } from 'next/navigation';

export default function NotAuthorized() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      
      <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-6 w-[350px] text-center shadow-lg">
        
        {/* GAMBAR */}
        <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
          <img
            src="/images/gambar.jpg" // 🔥 ganti nanti
            alt="not authorized"
            className="w-full h-full object-cover"
          />
        </div>

        {/* TEXT */}
        <h1 className="text-lg font-semibold text-gray-800">
          ❌ Anda belum login
        </h1>

        <p className="text-sm text-gray-600 mt-1">
          Silakan login terlebih dahulu
        </p>

        {/* BUTTON */}
        <button
          onClick={() => router.push('/auth/login')}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 mx-auto"
        >
          ← Kembali
        </button>

      </div>
    </div>
  );
}