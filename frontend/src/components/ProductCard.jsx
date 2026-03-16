import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-slate-100 flex flex-col h-full group">
      <div className="relative aspect-square overflow-hidden bg-slate-50 p-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-orange-500 font-semibold mb-1 uppercase tracking-wider">{product.category}</div>
        <h3 className="text-lg font-bold text-slate-800 mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-slate-500 mb-2">{product.quantity} • {product.brand}</p>
        
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">₹{product.price.toFixed(2)}</span>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Link 
            to={`/product/${product._id}`}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-center py-2 rounded-lg font-medium transition-colors text-sm"
          >
            Details
          </Link>
          <button 
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-1
              ${product.stock === 0 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-orange-500 hover:bg-orange-600 text-white'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
