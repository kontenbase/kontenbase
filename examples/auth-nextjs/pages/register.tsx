/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AppBar from '../components/AppBar';
import kontenbase from '../lib/kontenbase';
import styles from '../styles/Form.module.css';

const Register: NextPage = () => {
  const { replace } = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      name: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    const name = target.name.value;
    let firstName = '';
    let lastName = '';

    const split = name.split(' ');
    firstName = split[0];
    if (split.length >= 2) {
      split.shift();
      lastName = split.join(' ');
    }

    const { error } = await kontenbase.auth.register({
      email,
      password,
      firstName,
      lastName,
    });

    if (error) {
      alert(error.message);
    } else {
      replace('/');
    }
  };

  return (
    <>
      <Head>
        <title>Kontenbase - Register</title>
      </Head>
      <AppBar isPublic />
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h1>Create Account</h1>
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input
            required
            className={styles.input}
            id="name"
            type="text"
            name="name"
            placeholder="Name"
          />
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.input}
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div className={styles.buttonWrapper}>
          <button className={styles.button} type="submit">
            Register
          </button>
        </div>
        <div className={styles.footer}>
          <p>
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default Register;