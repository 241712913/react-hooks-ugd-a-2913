'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthFormWrapper from '../../../components/AuthFormWrapper';
import SocialAuth from '../../../components/SocialAuth';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaSyncAlt } from 'react-icons/fa';

type RegisterFormData = {
  username: string;
  email: string;
  nomorTelp: string;
  password: string;
  confirmPassword: string;
  captcha: string;
};

const generateCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const RegisterPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);

  const password = watch('password', '');

  useEffect(() => {
    const strength = Math.min(
      (password.length > 7 ? 25 : 0) +
      (/[A-Z]/.test(password) ? 25 : 0) +
      (/[0-9]/.test(password) ? 25 : 0) +
      (/[^A-Za-z0-9]/.test(password) ? 25 : 0)
    );

    setStrength(strength);
  }, [password]);

  const getColor = () => {
    if (strength === 25) return 'bg-red-500';
    if (strength === 50 || strength === 75) return 'bg-yellow-400';
    if (strength === 100) return 'bg-green-500';
    return 'bg-gray-300';
  };

  const onSubmit = (data: RegisterFormData) => {
    if (data.captcha !== captcha) {
      toast.error('Harus sesuai dengan captcha yang ditampilkan', {
        theme: 'dark',
      });
      return;
    }

    toast.success('Register Berhasil!', { theme: 'dark' });
    router.push('/auth/login');
  };

  return (
    <AuthFormWrapper title="Register">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">

        <div className="space-y-1">
          <label className="text-sm font-medium">
            Username <span className="text-xs text-gray-500">(max 8 karakter)</span>
          </label>
          <input
            {...register('username', {
              required: 'Username wajib diisi',
              minLength: { value: 3, message: 'Minimal 3 karakter' },
              maxLength: { value: 8, message: 'Maksimal 8 karakter' }
            })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
focus:outline-none focus:ring-1 focus:ring-blue-700 focus:border-blue-800 transition-all"
            
            placeholder="Masukkan username"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email wajib diisi',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.(com|net|co)$/,
                message: 'Email tidak valid'
              }
            })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
focus:outline-none focus:ring-1 focus:ring-blue-700 focus:border-blue-800 transition-all"
            placeholder="Masukkan email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Nomor Telepon</label>
          <input
            type="tel"
            {...register('nomorTelp', {
              required: 'Nomor telepon wajib diisi',
              minLength: { value: 10, message: 'Nomor telepon minimal 10 karakter' }
            })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
focus:outline-none focus:ring-1 focus:ring-blue-700 focus:border-blue-800 transition-all"
            placeholder="Masukkan nomor telepon"
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
          {errors.nomorTelp && <p className="text-red-500 text-sm">{errors.nomorTelp.message}</p>}
        </div>

        <div className="space-y-1 relative">
          <label className="text-sm font-medium">Password</label>

          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Password wajib diisi',
              minLength: { value: 8, message: 'Password minimal 8 karakter' }
            })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
focus:outline-none focus:ring-1 focus:ring-blue-700 focus:border-blue-800 transition-all"
            placeholder="Masukkan password"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

          {password && (
            <>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className={`${getColor()} h-2 rounded-full transition-all`}
                  style={{ width: `${strength}%` }}
                ></div>
              </div>

              <p className="text-sm text-gray-600">
                Strength: {strength}%
              </p>
            </>
          )}

          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Konfirmasi Password</label>
          
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('confirmPassword', {
                required: 'Konfirmasi password wajib diisi',
                validate: value =>
                  value === password || 'Konfirmasi Password tidak cocok'
              })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
focus:outline-none focus:ring-1 focus:ring-blue-700 focus:border-blue-800 transition-all"
              placeholder="Masukkan ulang password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {watch('confirmPassword') && (
            <>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className={`${getColor()} h-2 rounded-full transition-all`}
                  style={{ width: `${strength}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                Strength: {strength}%
              </p>
            </>
          )}

          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Captcha:</span>

            <span className="font-bold bg-gray-200 px-3 py-1 rounded">
              {captcha}
            </span>

            <button
              type="button"
              onClick={() => setCaptcha(generateCaptcha())}
              className="text-blue-600"
            >
              <FaSyncAlt />
            </button>
          </div>

          <input
            {...register('captcha', {
              required: 'Harus sesuai dengan captcha yang ditampilkan'
            })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
focus:outline-none focus:ring-1 focus:ring-blue-700 focus:border-blue-800 transition-all"
            placeholder="Masukkan captcha"
          />
          {errors.captcha && <p className="text-red-500 text-sm">{errors.captcha.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg"
        >
          Register
        </button>

        <SocialAuth />

        <p className="text-center text-sm">
          Sudah punya akun?{' '}
          <Link href="/auth/login" className="text-blue-600 font-bold">
            Login
          </Link>
        </p>

      </form>
    </AuthFormWrapper>
  );
};

export default RegisterPage;