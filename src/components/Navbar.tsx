import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500
        ${scrolled
          ? 'bg-gradient-to-r from-gray-900 to-indigo-800 shadow-xl'
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img src="/images/mov.png" alt="Logo" className="h-12 w-12" />
          </Link>
          <Link to="/" className="text-white text-2xl font-extrabold tracking-wide"></Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-10">
          <NavLink to="/" label="Home" />
          <NavLink to="/movies" label="Movies" />
          <NavLink to="/favorites" label="My Favorites" />
        </div>

        {/* Mobile Menu Icon - Animated Hamburger */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="relative w-10 h-10 flex flex-col items-center justify-center group focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`
                block absolute h-0.5 w-8 bg-white rounded transition-all duration-300
                ${isOpen
                  ? 'rotate-45 top-5 left-1'
                  : 'top-3 left-1 group-hover:w-10 group-hover:bg-indigo-400'}
              `}
            ></span>
            <span
              className={`
                block absolute h-0.5 w-8 bg-white rounded transition-all duration-300
                ${isOpen
                  ? 'opacity-0'
                  : 'top-5 left-1 group-hover:w-10 group-hover:bg-indigo-400'}
              `}
            ></span>
            <span
              className={`
                block absolute h-0.5 w-8 bg-white rounded transition-all duration-300
                ${isOpen
                  ? '-rotate-45 top-5 left-1'
                  : 'top-7 left-1 group-hover:w-10 group-hover:bg-indigo-400'}
              `}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-black/80 backdrop-blur-lg z-40 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-700 ease-in-out shadow-2xl`}
      >
        <div className="flex flex-col justify-between h-full p-8">
          <div className="space-y-8">
            <div className="flex justify-end">
              <button
                onClick={toggleMenu}
                className="text-white text-3xl hover:text-indigo-400 transition"
              >
                {/* Extra close X for accessibility */}
                <svg width="32" height="32" viewBox="0 0 32 32" className="text-white">
                  <line x1="8" y1="8" x2="24" y2="24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <line x1="24" y1="8" x2="8" y2="24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-start space-y-6 text-white text-2xl font-semibold">
              <MobileLink to="/" label="Home" closeMenu={toggleMenu} />
              <MobileLink to="/movies" label="Movies" closeMenu={toggleMenu} />
              <MobileLink to="/favorites" label="My favorites" closeMenu={toggleMenu} />
              
            </div>
          </div>

          <div className="text-center text-sm text-gray-400 pt-6 border-t border-gray-700">
            © {new Date().getFullYear()} TrailerX. All rights reserved.
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        />
      )}
    </nav>
  );
};

const NavLink = ({ to, label }: { to: string; label: string }) => (
  <Link
    to={to}
    className="relative text-white text-lg font-semibold hover:text-indigo-300 transition duration-300 group"
  >
    {label}
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

const MobileLink = ({
  to,
  label,
  closeMenu,
}: {
  to: string;
  label: string;
  closeMenu: () => void;
}) => (
  <Link
    to={to}
    onClick={closeMenu}
    className="hover:text-indigo-400 transition duration-300"
  >
    {label}
  </Link>
);

export default Navbar;