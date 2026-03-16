import { useEffect, useMemo } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const orderId = searchParams.get('order_id');
  const totalPrice = location.state?.totalPrice;
  const { clearCart } = useCart();

  const deliveryDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3); // Estimate 3 days delivery
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }, []);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
        {/* Header Decor */}
        <div className="h-3 bg-gradient-to-r from-green-400 via-green-500 to-green-600"></div>
        
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border-4 border-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-black text-slate-800 mb-1 uppercase tracking-tight">Order Confirmed!</h1>
          <p className="text-green-600 font-bold text-sm mb-8 uppercase tracking-widest">Your order has been successfully placed</p>
          
          {/* Order Info Card */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-8 text-left">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Payment Method</span>
                <span className="text-slate-900 font-black flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 100 4v2a2 2 0 002 2h12a2 2 0 002-2v-2a2 2 0 100-4V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                  Cash on Delivery
                </span>
              </div>
              
              <div className="flex justify-between items-center py-4 border-y border-slate-200/60">
                <span className="text-slate-500 font-medium">Total Amount</span>
                <span className="text-2xl font-black text-slate-900">₹{totalPrice ? totalPrice.toFixed(2) : '0.00'}</span>
              </div>
              
              <div className="pt-2">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Estimated Delivery</span>
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Expect your package by</span>
                    <span className="font-bold text-slate-800 text-sm">{deliveryDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Link to="/profile" className="w-full bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-slate-200 transform active:scale-95 text-xs uppercase tracking-widest">
              View My Orders
            </Link>
            <Link to="/" className="w-full bg-white text-slate-500 font-bold py-3 rounded-xl hover:text-slate-800 transition-all text-xs uppercase tracking-widest border border-transparent hover:border-slate-100">
              Continue Shopping
            </Link>
          </div>
        </div>
        
        {/* Footer Decor */}
        <div className="bg-slate-50 py-4 px-8 border-t border-slate-100">
           <p className="text-[10px] text-slate-400 text-center font-medium">Thank you for shopping with <span className="text-orange-500 font-bold">Aadithya Super Store</span></p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
