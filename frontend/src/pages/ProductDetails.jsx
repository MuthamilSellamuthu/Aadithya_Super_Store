import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading product details...</div>;
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-16 text-center">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-6 text-slate-500">
        <Link to="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/catalog" className="hover:text-orange-500">Catalog</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{product.name}</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2 p-8 flex items-center justify-center bg-slate-50 border-r border-slate-100">
          <div className="w-full h-full max-h-[500px] bg-white rounded-2xl shadow-inner-sm p-8 flex items-center justify-center border border-slate-200/50">
            <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain drop-shadow-xl" />
          </div>
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
          <div className="mb-2">
            <span className="text-sm font-bold tracking-wider text-orange-500 uppercase">{product.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{product.name}</h1>
          <p className="text-lg text-slate-600 mb-6">{product.brand} • {product.quantity}</p>
          
          <div className="text-4xl font-extrabold text-slate-900 mb-6 flex items-end gap-2">
            ₹{product.price.toFixed(2)}
            {product.stock > 0 ? (
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded ml-4 relative bottom-1">In Stock ({product.stock})</span>
            ) : (
              <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded ml-4 relative bottom-1">Out of Stock</span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center border border-slate-200 rounded-lg bg-white">
              <button 
                className="px-4 py-3 text-slate-500 hover:text-orange-500 focus:outline-none disabled:opacity-50"
                onClick={() => setQty(Math.max(1, qty - 1))}
                disabled={product.stock === 0}
              >-</button>
              <span className="w-12 text-center font-bold text-slate-800">{qty}</span>
              <button 
                className="px-4 py-3 text-slate-500 hover:text-orange-500 focus:outline-none disabled:opacity-50"
                onClick={() => setQty(Math.min(product.stock, qty + 1))}
                disabled={product.stock === 0}
              >+</button>
            </div>
            
            <button 
              onClick={() => addToCart(product, qty)}
              disabled={product.stock === 0}
              className={`flex-1 py-3 px-6 rounded-lg font-bold text-lg transition-all shadow-sm ${
                product.stock === 0 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-orange-500/30'
              }`}
            >
              Add to Cart
            </button>
          </div>


          {/* Action: Info Toggle Button */}
          <div className="mb-8">
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="flex items-center justify-between w-full p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-900 leading-tight">Product Information</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Ingredients, Nutrition, Mfg & Expiry</p>
                </div>
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${showInfo ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Expanded Content Area */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showInfo ? 'max-h-[1000px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-sm">
                  {/* Basic Info */}
                  <div>
                    <span className="text-slate-500 block mb-1 uppercase text-[10px] font-bold tracking-wider">Aisle / Section</span>
                    <span className="font-medium text-slate-800">{product.aisle} • {product.section}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1 uppercase text-[10px] font-bold tracking-wider">Stock Availability</span>
                    <span className="font-medium text-slate-800">{product.stock} units</span>
                  </div>

                  {/* Dates */}
                  {product.manufacturingDate && (
                    <div>
                      <span className="text-slate-500 block mb-1 uppercase text-[10px] font-bold tracking-wider">Manufacturing Date</span>
                      <span className="font-medium text-slate-800">{new Date(product.manufacturingDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {product.expiryDate && (
                    <div>
                      <span className="text-slate-500 block mb-1 uppercase text-[10px] font-bold tracking-wider">Expiry Date</span>
                      <span className="font-medium text-slate-800">{new Date(product.expiryDate).toLocaleDateString()}</span>
                    </div>
                  )}

                  {/* Ingredients */}
                  {product.ingredients && product.ingredients.length > 0 && (
                    <div className="sm:col-span-2 pt-2 border-t border-slate-50">
                      <span className="text-slate-500 block mb-2 uppercase text-[10px] font-bold tracking-wider">Ingredients</span>
                      <div className="flex flex-wrap gap-2">
                        {product.ingredients.map((ing, i) => (
                          <span key={i} className="bg-slate-50 text-slate-700 px-3 py-1 rounded-full border border-slate-100 text-xs">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Nutrition */}
                  {product.nutritionInformation && (
                    <div className="sm:col-span-2 pt-4 border-t border-slate-50">
                      <span className="text-slate-500 block mb-3 uppercase text-[10px] font-bold tracking-wider">Nutrition Information</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-orange-50/50 p-3 rounded-lg border border-orange-100/50">
                          <span className="block text-[10px] text-orange-600 font-bold uppercase mb-1">Calories</span>
                          <span className="font-bold text-slate-800">{product.nutritionInformation.calories || '-'}</span>
                        </div>
                        <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100/50">
                          <span className="block text-[10px] text-blue-600 font-bold uppercase mb-1">Protein</span>
                          <span className="font-bold text-slate-800">{product.nutritionInformation.protein || '-'}</span>
                        </div>
                        <div className="bg-green-50/50 p-3 rounded-lg border border-green-100/50">
                          <span className="block text-[10px] text-green-600 font-bold uppercase mb-1">Fat</span>
                          <span className="font-bold text-slate-800">{product.nutritionInformation.fat || '-'}</span>
                        </div>
                        <div className="bg-purple-50/50 p-3 rounded-lg border border-purple-100/50">
                          <span className="block text-[10px] text-purple-600 font-bold uppercase mb-1">Carbs</span>
                          <span className="font-bold text-slate-800">{product.nutritionInformation.carbohydrates || '-'}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
