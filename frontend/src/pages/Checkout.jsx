import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/api';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'IN'
  });

  const totalAmount = cartTotal * 1.05; // Including tax

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to proceed.");
      return;
    }

    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
      alert("Please fill in all shipping details.");
      return;
    }

    setIsProcessing(true);
    try {
      // Handle Cash on Delivery (COD)
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id
        })),
        shippingAddress,
        paymentMethod: "COD",
        itemsPrice: cartTotal,
        taxPrice: cartTotal * 0.05,
        shippingPrice: 0,
        totalPrice: totalAmount,
        isPaid: false
      };

      const createdOrder = await createOrder(orderData);
      if (createdOrder) {
        navigate(`/payment-success?order_id=${createdOrder._id || 'COD'}`, { 
          state: { totalPrice: orderData.totalPrice } 
        });
      }

    } catch (error) {
      console.error("Order Placement Error:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6">Shipping Details</h2>
          <form onSubmit={handlePlaceOrder}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Postal Code</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="p-4 border border-orange-500 bg-orange-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border-4 border-orange-500 bg-white"></div>
                  <div className="ml-3">
                    <span className="block font-bold text-slate-900">Cash on Delivery</span>
                    <span className="block text-sm text-slate-500">Pay when your order arrives</span>
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isProcessing}
              className={`w-full mt-8 bg-slate-900 border border-slate-900 hover:bg-black text-white py-3 rounded-lg font-bold text-lg transition-colors shadow-sm ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isProcessing ? 'Processing...' : 'Place Order (COD)'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <div key={item._id} className="flex justify-between text-sm">
                <span className="text-slate-600">{item.name} x {item.qty}</span>
                <span className="font-medium">₹{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Tax (Est. 5%)</span>
              <span>₹{(cartTotal * 0.05).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-lg pt-2">
              <span className="font-bold text-slate-900">Total</span>
              <span className="font-black text-orange-600">₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
