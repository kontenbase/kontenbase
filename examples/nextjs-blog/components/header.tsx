import Link from 'next/link';
import Container from './container';

const Header = () => {
  return (
    <nav className="mb-6 sm:mb-20 pb-4 pt-3 border-b border-gray-200 sticky top-0 bg-white">
      <Container>
        <Link href="/">
          <img
            className="h-8 cursor-pointer sm:h-10"
            alt="Logo"
            src="/logo.svg"
            style={{
              marginLeft: -4
            }}
          />
        </Link>
      </Container>
    </nav>
  );
};

export default Header;
