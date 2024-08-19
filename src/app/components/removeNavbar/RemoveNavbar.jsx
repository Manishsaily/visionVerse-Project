"use  client"

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Removenavbar = ({ children }) => {
  const router = useRouter();
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    console.log(location.pathname)
    if (router.pathname === '/login') {
      setShowNavBar(false);
    }
  }, [router.pathname]);

  return <div>{showNavBar && children}</div>;
};

export default Removenavbar;