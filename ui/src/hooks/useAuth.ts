import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
}

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
}

export const useAuth = (): UseAuthReturn => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  return { user, isLoading };
};