import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/api';
const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-lg">
        <div className="w-24 h-24 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
        <Link to="/catalog" className="inline-block bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
          Start Shopping
        </Link>
      </div>
    );
  }

  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (!user) {
      alert("Please login to place an order.");
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3 flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 hidden sm:grid grid-cols-12 gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <ul className="divide-y divide-slate-100">
              {cartItems.map(item => (
                <li key={item._id} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center">
                    <div className="w-full sm:col-span-6 flex items-center gap-4">
                      <div className="w-20 h-20 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                      <div>
                        <Link to={`/product/${item._id}`} className="font-bold text-slate-800 hover:text-orange-500 line-clamp-2">{item.name}</Link>
                        <p className="text-sm text-slate-500 mt-1">{item.brand} • {item.quantity}</p>
                        
                        {/* Mobile controls */}
                        <div className="sm:hidden flex items-center justify-between mt-3 w-full">
                          <span className="font-bold text-slate-900">₹{item.price.toFixed(2)}</span>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center border border-slate-200 rounded">
                              <button onClick={() => updateQuantity(item._id, item.qty - 1)} className="px-2 py-1 text-slate-500">-</button>
                              <span className="px-2 text-sm font-medium">{item.qty}</span>
                              <button onClick={() => updateQuantity(item._id, item.qty + 1)} className="px-2 py-1 text-slate-500">+</button>
                            </div>
                            <button onClick={() => removeFromCart(item._id)} className="text-red-500 p-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="hidden sm:block sm:col-span-2 text-center font-medium text-slate-800">
                      ₹{item.price.toFixed(2)}
                    </div>
                    
                    <div className="hidden sm:flex sm:col-span-2 justify-center">
                      <div className="flex items-center border border-slate-200 rounded-md bg-white">
                        <button onClick={() => updateQuantity(item._id, item.qty - 1)} className="px-2 py-1 text-slate-500 hover:text-orange-500 hover:bg-slate-50">-</button>
                        <span className="w-8 text-center text-sm font-medium text-slate-800">{item.qty}</span>
                        <button onClick={() => updateQuantity(item._id, Math.min(item.stock, item.qty + 1))} className="px-2 py-1 text-slate-500 hover:text-orange-500 hover:bg-slate-50">+</button>
                      </div>
                    </div>
                    
                    <div className="hidden sm:flex sm:col-span-2 items-center justify-end gap-3 text-right">
                      <span className="font-bold text-slate-900">₹{(item.price * item.qty).toFixed(2)}</span>
                      <button onClick={() => removeFromCart(item._id)} className="text-slate-400 hover:text-red-500 p-1 transition-colors" title="Remove item">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between">
              <button 
                onClick={clearCart} 
                className="text-sm text-slate-500 hover:text-red-600 font-medium transition-colors"
              >
                Clear Cart
              </button>
              <Link to="/catalog" className="text-sm text-orange-600 hover:text-orange-700 font-bold transition-colors">
                Continue Shopping &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
            <h3 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">Order Summary</h3>
            
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                <span className="font-medium text-slate-900">₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charge</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax (Est.)</span>
                <span className="font-medium text-slate-900">₹{(cartTotal * 0.05).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t border-slate-100 pt-4 mb-6">
              <div className="flex justify-between items-center text-lg">
                <span className="font-bold text-slate-900">Total</span>
                <span className="font-black text-orange-600">₹{(cartTotal * 1.05).toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              className={`w-full bg-slate-900 hover:bg-black text-white py-3 rounded-lg font-bold text-lg transition-colors shadow-sm mb-3 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing Order...' : 'Proceed to Checkout'}
            </button>
            
            <p className="text-xs text-center text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure Checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
