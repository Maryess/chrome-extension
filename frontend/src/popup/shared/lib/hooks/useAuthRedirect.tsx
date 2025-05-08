import { useEffect } from 'react';

import { useUserStore } from '../../../store/store';
import { useNavigate } from 'react-router';

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUserStore(); 

  useEffect(() => {
    const unsubscribe = useUserStore.persist.onFinishHydration(() => {
      if (!user && !isLoading) {
        navigate('/auth');
      }
    });

    return () => unsubscribe();
  }, [user, isLoading, navigate]);
  
  useEffect(() => {
    if (user && !isLoading) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);
};