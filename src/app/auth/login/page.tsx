'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthFormWrapper from '../../../components/AuthFormWrapper';
import SocialAuth from '../../../components/SocialAuth';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaSyncAlt } from 'react-icons/fa';

interface LoginFormData {
  email: string;
  password: string;
  captchaInput: string;
  rememberMe: boolean;
}

interface ErrorObject {
  email?: string;
  password?: string;
  captcha?: string;
}

const generateCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const LoginPage = () => {
  const router = useRouter();

  const [attempts, setAttempts] = useState(3);
  const [captcha, setCaptcha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    captchaInput: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<ErrorObject>({});

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: ErrorObject = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email tidak boleh kosong';
    } else if (!/^\d{4}@gmail\.com$/.test(formData.email)) {
      newErrors.email = 'Email harus sesuai dengan format npm kalian (cth. 2913@gmail.com)';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password tidak boleh kosong';
    } else if (!/^\d{9}$/.test(formData.password)) {
      newErrors.password = 'Password harus sesuai dengan format npm kalian (cth. 241712913)';
    }

    if (!formData.captchaInput.trim()) {
      newErrors.captcha = 'Captcha belum diisi';
    } else if (formData.captchaInput !== captcha) {
      newErrors.captcha = 'Captcha tidak valid';
    }

    if (Object.keys(newErrors).length > 0) {
      const newAttempt = attempts - 1;

      if (newAttempt <= 0) {
        setAttempts(0);
        toast.error('Kesempatan login habis!', {
          theme: 'dark',
          position: 'top-right',
        });
      } else {
        setAttempts(newAttempt);
        toast.error(`Login Gagal! Sisa kesempatan: ${newAttempt}`, {
          theme: 'dark',
          position: 'top-right',
        });
      }
      setErrors(newErrors);
      return;
    }

    localStorage.setItem("isLogin", "true");

    toast.success('Login Berhasil!', {
      autoClose: 1500,
    });

    setTimeout(() => {
      router.push('/home');
    }, 1500);

  return (
    <AuthFormWrapper title="Login">
      <form onSubmit={handleSubmit} className="space-y-4 w-full">

        {/* SISA KESEMPATAN */}
        <p className="text-center font-semibold text-sm text-gray-700">
          Sisa Kesempatan: {attempts}
        </p>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukan email"
          />
          {errors.email && <p className="text-red-600 text-sm italic">{errors.email}</p>}
        </div>

        <div className="space-y-1 relative">
          <label className="text-sm font-medium text-gray-700">Password</label>

          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukan password"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

          {errors.password && <p className="text-red-600 text-sm italic">{errors.password}</p>}

          <div className="flex justify-between items-center mt-1">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                className="mr-2"
              />
              Ingat Saya
            </label>

            <Link href="#" className="text-blue-600 text-sm font-semibold">
              Forgot Password?
            </Link>
          </div>
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
            type="text"
            name="captchaInput"
            value={formData.captchaInput}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.captcha ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukan captcha"
          />

          {errors.captcha && <p className="text-red-600 text-sm italic">{errors.captcha}</p>}
        </div>

        <button
          type="submit"
          disabled={attempts === 0}
          className={`w-full py-2.5 rounded-lg font-semibold text-white 
            ${attempts === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          Sign In
        </button>

        <button
          type="button"
          disabled={attempts !== 0}
          onClick={() => {
            setAttempts(3);
            toast.success('Kesempatan login berhasil direset!', {
              theme: 'dark',
              position: 'top-right',
            });
          }}
          
          className={`w-full mt-2 py-2 rounded-lg font-semibold 
            ${attempts === 0 
              ? 'bg-green-500 text-white cursor-pointer' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  >
          Reset Kesempatan
        </button>

        <SocialAuth />

        <p className="text-center text-sm text-gray-600">
          Tidak punya akun?{' '}
          <Link href="/auth/register" className="text-blue-600 font-semibold">
            Daftar
          </Link>
        </p>

      </form>
    </AuthFormWrapper>
  );
};

export default LoginPage;