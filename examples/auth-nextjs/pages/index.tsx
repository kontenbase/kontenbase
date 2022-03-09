/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next';
import { useMemo } from 'react';
import kontenbase from '../lib/kontenbase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AppBar from '../components/AppBar';
import Head from 'next/head';

const Home: NextPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    const { user, error } = await kontenbase.auth.user();
    setLoading(false);
    if (error) {
      router.push('/login');
    } else {
      setUser(user);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getProfile();
    } else {
      router.push('/login');
    }
  }, []);

  const name = useMemo(() => {
    let result = '';
    if (user?.firstName) {
      result = user.firstName;
    }

    return result;
  }, [user]);

  return (
    <>
      <Head>
        <title>Kontenbase - Auth</title>
      </Head>
      <AppBar user={user} />
      <div className="container">
        <h3>Hello {name}</h3>
      </div>
    </>
  );
};

export default Home;