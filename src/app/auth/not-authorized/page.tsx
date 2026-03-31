'use client';

import { useRouter } from 'next/navigation';

export default function NotAuthorized() {
  const router = useRouter();

  return (
    <div className="text-center mt-20">
      <h1 className="text-xl font-bold text-red-600">
        Akses Ditolak!
      </h1>
      <p className="mt-2">Silakan login terlebih dahulu.</p>

      <button
        onClick={() => router.push('/auth/login')}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Kembali ke Login
      </button>
    </div>
  );
}