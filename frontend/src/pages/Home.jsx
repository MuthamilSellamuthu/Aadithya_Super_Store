import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setFeaturedProducts(data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Welcome to <span className="text-orange-400">Aadithya</span> Super Store
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-lg">
              Experience the future of shopping. Browse our online catalog or use our AR navigation to find exactly what you need in our store.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/catalog" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold text-lg transition-colors shadow-lg shadow-orange-500/30">
                Shop Now
              </Link>
              <Link to="/virtual-store" className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white px-6 py-3 rounded-lg font-bold text-lg transition-colors flex items-center gap-2">
                AR Navigation
              </Link>
            </div>
          </div>
          <div className="flex-1 hidden md:flex justify-center">
            {/* Abstract Decorative Element */}
            <div className="relative w-72 h-72">
               <div className="absolute inset-0 bg-orange-500 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
               <div className="absolute top-0 right-0 h-48 w-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>
               <img src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=600" alt="Groceries" className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white/10 rotate-3 z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="bg-orange-50 py-4 border-y border-orange-100">
        <div className="container mx-auto px-4 flex justify-between items-center text-orange-800 text-sm font-medium">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free Delivery over $50
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Fast 30-min Delivery
          </div>
          <div className="flex items-center gap-2 text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
            Up to 50% OFF Offers
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center font-display">Shop by Category</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6">
            {[
              { name: 'Cleaning', img: '/images/products/Surf_excel.jpg' },
              { name: 'Food', img: '/images/products/basmati.jpg' },
              { name: 'Snacks', img: '/images/products/lays.jpg' },
              { name: 'Personal Care', img: '/images/products/parachute.jpg' },
              { name: 'Dairy', img: '/images/products/amulbutter.jpg' },
              { name: 'Beverages', img: '/images/products/nescafe.jpg' },
              { name: 'Health', img: '/images/products/Dettol.jpg' }
            ].map(cat => (
              <Link to={`/catalog?category=${cat.name}`} key={cat.name} className="group flex flex-col items-center p-3 rounded-2xl hover:shadow-2xl transition-all duration-500 bg-white border border-slate-50">
                <div className="w-28 h-28 rounded-2xl overflow-hidden mb-3 shadow-lg group-hover:shadow-orange-200 group-hover:scale-105 transition-all relative">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-slate-700 group-hover:text-orange-500 transition-colors uppercase tracking-wider text-xs">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Featured Products</h2>
              <p className="text-slate-500 mt-1">Trending daily essentials for you</p>
            </div>
            <Link to="/catalog" className="text-orange-500 font-medium hover:text-orange-600 hidden sm:block">View All</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
            {featuredProducts.length === 0 && (
              <div className="col-span-full text-center py-10 text-slate-500">Loading featured products...</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
