import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 pb-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2 tracking-tight">
            <span className="text-orange-500">Aadithya</span> 
            Super Store
          </Link>
          
          <div className="flex-1 w-full max-w-2xl mx-6 hidden md:block">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products, brands and more..." 
                className="w-full py-2.5 px-4 pr-10 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-white"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-orange-500 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <Link to="/catalog" className="text-sm font-medium hover:text-orange-400 transition-colors hidden sm:block">All Products</Link>
            <Link to="/offers" className="text-sm font-medium hover:text-orange-400 transition-colors hidden sm:block">Offers</Link>
            <Link to="/virtual-store" className="text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors border border-orange-500 px-3 py-1.5 rounded flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              AR Navigation
            </Link>
            <Link to="/cart" className="flex items-center gap-1 hover:text-orange-400 transition-colors group relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm font-bold">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth section */}
            <div className="flex items-center gap-4 pl-4 border-l border-slate-700 ml-2 relative group cursor-pointer">
              {user ? (
                <div className="relative group">
                  <div className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium hidden sm:block">{user.name}</span>
                  </div>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all border border-slate-100">
                    {user.role === 'admin' && (
                      <Link to="/admin" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Admin Dashboard</Link>
                    )}
                    <Link to="/profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Profile & Orders</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100">Sign Out</button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="text-sm font-medium hover:text-orange-400 transition-colors">
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
