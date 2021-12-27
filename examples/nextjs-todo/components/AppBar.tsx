/* eslint-disable @next/next/no-img-element */
import { useMemo } from 'react';
import { Menu } from '@headlessui/react';
import UserType from '../types/User';
import kontenbase from '../lib/kontenbase';
import { useRouter } from 'next/router';

interface Props {
  user?: UserType;
  isPublic?: boolean;
}

export default function AppBar({ user, isPublic }: Props) {
  const router = useRouter();

  const name = useMemo(() => {
    let result = '';
    if (user?.firstName) {
      result += user.firstName[0];
    }

    return result;
  }, [user]);

  const handleLogout = () => {
    kontenbase.auth.logout();
    router.push('/login');
  };

  return (
    <nav>
      <div className="container app-bar">
        {isPublic ? <div /> : null}
        <img className="logo" alt="Logo" src="/logo.svg" />
        {isPublic ? (
          <div />
        ) : (
          <Menu
            as="div"
            style={{
              position: 'relative',
            }}
          >
            <Menu.Button className="avatar-button">
              <div className="avatar-container">
                <div className="avatar">{name}</div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.00002 11.3335C7.66269 11.3335 7.34002 11.1782 7.11602 10.9055L4.30735 7.50683C3.97135 7.0995 3.90402 6.5215 4.13468 6.03283C4.33802 5.6015 4.74269 5.3335 5.19135 5.3335H10.8087C11.2574 5.3335 11.662 5.6015 11.8654 6.03283C12.096 6.5215 12.0287 7.0995 11.6934 7.50616L8.88402 10.9055C8.66002 11.1782 8.33735 11.3335 8.00002 11.3335Z"
                    fill="#38BF4B"
                  />
                  <mask
                    id="mask0_580_677"
                    maskUnits="userSpaceOnUse"
                    x="3"
                    y="5"
                    width="10"
                    height="7"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.00002 11.3335C7.66269 11.3335 7.34002 11.1782 7.11602 10.9055L4.30735 7.50683C3.97135 7.0995 3.90402 6.5215 4.13468 6.03283C4.33802 5.6015 4.74269 5.3335 5.19135 5.3335H10.8087C11.2574 5.3335 11.662 5.6015 11.8654 6.03283C12.096 6.5215 12.0287 7.0995 11.6934 7.50616L8.88402 10.9055C8.66002 11.1782 8.33735 11.3335 8.00002 11.3335Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask0_580_677)">
                    <rect width="16" height="16" fill="#5D5FEF" />
                  </g>
                </svg>
              </div>
            </Menu.Button>
            <Menu.Items className="menu-items">
              <div className="arrow" />
              <Menu.Item onClick={handleLogout}>
                <div className="menu-item logout-button">
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.33366 3.90446C5.33366 4.27113 5.03366 4.57113 4.66699 4.57113H4.00033V12.5711H4.66699C5.03366 12.5711 5.33366 12.8711 5.33366 13.2378C5.33366 13.6045 5.03366 13.9045 4.66699 13.9045H3.33366C2.96699 13.9045 2.66699 13.6045 2.66699 13.2378V3.90446C2.66699 3.53779 2.96699 3.23779 3.33366 3.23779H4.66699C5.03366 3.23779 5.33366 3.53779 5.33366 3.90446ZM12.0029 5.52098L13.8789 8.18764C14.0456 8.42364 14.0403 8.74031 13.8669 8.97098L11.8669 11.6376C11.7363 11.8123 11.5356 11.9043 11.3329 11.9043C11.1943 11.9043 11.0536 11.861 10.9336 11.771C10.6389 11.5503 10.5796 11.1323 10.8003 10.8383L12.0009 9.23764H12.0003H6.66693C6.29893 9.23764 6.00026 8.93964 6.00026 8.57098C6.00026 8.20231 6.29893 7.90431 6.66693 7.90431H12.0003C12.0113 7.90431 12.0215 7.90735 12.0318 7.91041C12.0402 7.9129 12.0486 7.91541 12.0576 7.91631L10.9123 6.28764C10.7003 5.98698 10.7729 5.57098 11.0743 5.35898C11.3749 5.14631 11.7909 5.21964 12.0029 5.52098Z"
                      fill="#FF4450"
                    />
                    <mask
                      id="mask0_645_887"
                      maskUnits="userSpaceOnUse"
                      x="2"
                      y="3"
                      width="13"
                      height="11"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.33366 3.90446C5.33366 4.27113 5.03366 4.57113 4.66699 4.57113H4.00033V12.5711H4.66699C5.03366 12.5711 5.33366 12.8711 5.33366 13.2378C5.33366 13.6045 5.03366 13.9045 4.66699 13.9045H3.33366C2.96699 13.9045 2.66699 13.6045 2.66699 13.2378V3.90446C2.66699 3.53779 2.96699 3.23779 3.33366 3.23779H4.66699C5.03366 3.23779 5.33366 3.53779 5.33366 3.90446ZM12.0029 5.52098L13.8789 8.18764C14.0456 8.42364 14.0403 8.74031 13.8669 8.97098L11.8669 11.6376C11.7363 11.8123 11.5356 11.9043 11.3329 11.9043C11.1943 11.9043 11.0536 11.861 10.9336 11.771C10.6389 11.5503 10.5796 11.1323 10.8003 10.8383L12.0009 9.23764H12.0003H6.66693C6.29893 9.23764 6.00026 8.93964 6.00026 8.57098C6.00026 8.20231 6.29893 7.90431 6.66693 7.90431H12.0003C12.0113 7.90431 12.0215 7.90735 12.0318 7.91041C12.0402 7.9129 12.0486 7.91541 12.0576 7.91631L10.9123 6.28764C10.7003 5.98698 10.7729 5.57098 11.0743 5.35898C11.3749 5.14631 11.7909 5.21964 12.0029 5.52098Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_645_887)">
                      <rect
                        y="0.571289"
                        width="16"
                        height="16"
                        fill="#FF4450"
                      />
                    </g>
                  </svg>
                  Logout
                </div>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        )}
      </div>
    </nav>
  );
}
