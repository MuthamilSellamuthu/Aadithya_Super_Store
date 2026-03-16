import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category');
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [category, setCategory] = useState(urlCategory || 'All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Update category state if URL param changes
    if (urlCategory) {
      setCategory(urlCategory);
    } else {
      setCategory('All');
    }
  }, [urlCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;
    
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }
    
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
  }, [category, searchQuery, products]);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Our Products</h1>
        <p className="text-slate-500">Find everything you need for your daily life.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-slate-800 pb-2 border-b border-slate-100">Filters</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Search Products</label>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..." 
                className="w-full py-2 px-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Categories</label>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      if (cat === 'All') {
                        searchParams.delete('category');
                      } else {
                        searchParams.set('category', cat);
                      }
                      setSearchParams(searchParams);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      category === cat 
                        ? 'bg-orange-50 text-orange-600 font-medium' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center border border-slate-100 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-bold text-slate-700 mb-1">No products found</h3>
              <p className="text-slate-500">Try adjusting your category or search filters.</p>
              <button 
                onClick={() => {setCategory('All'); setSearchQuery('');}}
                className="mt-4 px-4 py-2 bg-orange-100 text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
