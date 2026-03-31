import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Auth System',
  description: 'Login and Register System',
};

export default function RootLayout({ children }: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center p-4">

        {children}

        <ToastContainer
          position="top-center"
          autoClose={2000} 
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
          newestOnTop
        />

      </body>
    </html>
  );
}