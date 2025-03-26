import { useEffect } from 'react';
import { isAuthenticated, setAuthToken } from '../utils/auth';

export default function Login() {
  useEffect(() => {
    // URL'den token'ı al
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    // URL'den gelen token varsa kaydet
    if (token) {
      setAuthToken(token);
    }

    // Kullanıcı zaten authenticate olduysa ana sayfaya yönlendir
    if (isAuthenticated()) {
      window.location.href = '/';
    }
  }, []);

  // ...existing code...
}
