import { useRouter } from 'next/router';
import { useEffect } from 'react';

function withAuth(WrappedComponent) {
  return function(props) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
