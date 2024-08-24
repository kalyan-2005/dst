import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              {/* Logo or Home Link */}
              <Link href="/">
                <h1 className="flex items-center py-4 px-2">
                  <span className="font-semibold text-black text-lg">MySite</span>
                </h1>
              </Link>
            </div>
            {/* Primary Navbar items */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/">
                <h1 className="py-4 px-2 text-black font-semibold hover:text-gray-600 transition duration-300">
                  Home
                </h1>
              </Link>
              <Link href="/about">
                <h1 className="py-4 px-2 text-black font-semibold hover:text-gray-600 transition duration-300">
                  About
                </h1>
              </Link>
              <Link href="/services">
                <h1 className="py-4 px-2 text-black font-semibold hover:text-gray-600 transition duration-300">
                  Services
                </h1>
              </Link>
              <Link href="/contact">
                <h1 className="py-4 px-2 text-black font-semibold hover:text-gray-600 transition duration-300">
                  Contact
                </h1>
              </Link>
            </div>
          </div>
          {/* Secondary Navbar items (e.g., login, sign up) */}
          <div className="hidden md:flex items-center space-x-3 ">
            <Link href="/login">
              <h1 className="py-2 px-2 font-medium text-black rounded hover:bg-gray-100 transition duration-300">
                Log In
              </h1>
            </Link>
            <Link href="/signup">
              <h1 className="py-2 px-2 font-medium text-white bg-black rounded hover:bg-gray-800 transition duration-300">
                Sign Up
              </h1>
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className="md:hidden flex items-center">
        <button className="outline-none mobile-menu-button">
          <svg
            className=" w-6 h-6 text-black"
            x-show="!showMenu"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      <div className="hidden mobile-menu">
        <ul className="">
          <li className="active">
            <Link href="/">
              <h1 className="block text-sm px-2 py-4 text-white bg-black font-semibold">Home</h1>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <h1 className="block text-sm px-2 py-4 hover:bg-gray-100 transition duration-300">About</h1>
            </Link>
          </li>
          <li>
            <Link href="/services">
              <h1 className="block text-sm px-2 py-4 hover:bg-gray-100 transition duration-300">Services</h1>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <h1 className="block text-sm px-2 py-4 hover:bg-gray-100 transition duration-300">Contact</h1>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
