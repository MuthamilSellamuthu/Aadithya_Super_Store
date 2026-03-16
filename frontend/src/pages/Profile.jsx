import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserProfile, getMyOrders } from '../services/api';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      const fetchProfile = async () => {
        try {
          const profile = await getUserProfile();
          setName(profile.name);
          setEmail(profile.email);
        } catch (err) {
          setError('Could not fetch profile');
        }
      };
      
      const fetchOrders = async () => {
        try {
          const myOrders = await getMyOrders();
          setOrders(myOrders);
          setLoadingOrders(false);
        } catch (err) {
          console.error('Error fetching orders', err);
          setLoadingOrders(false);
        }
      };

      fetchProfile();
      fetchOrders();
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      const updatedUser = await updateUserProfile({ id: user._id, name, email, password });
      
      // Update local storage via context logic (we might just re-login silently or update state)
      const freshUserData = { ...user, name: updatedUser.name, email: updatedUser.email };
      localStorage.setItem('user', JSON.stringify(freshUserData));
      
      setMessage('Profile Updated Successfully');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Edit Section */}
        <div className="md:w-1/3">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">User Profile</h2>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            {message && <div className="bg-green-50 text-green-700 p-3 rounded mb-4 text-sm font-medium">{message}</div>}
            {error && <div className="bg-red-50 text-red-700 p-3 rounded mb-4 text-sm font-medium">{error}</div>}
            
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">New Password (Optional)</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold transition-colors mt-2"
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>
        </div>

        {/* Order History Section */}
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Order History</h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {loadingOrders ? (
              <div className="p-8 text-center text-slate-500">Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                You haven't placed any orders yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider border-b border-slate-200">
                      <th className="p-4 font-bold">Order ID</th>
                      <th className="p-4 font-bold">Date</th>
                      <th className="p-4 font-bold">Total</th>
                      <th className="p-4 font-bold">Paid</th>
                      <th className="p-4 font-bold">Delivered</th>
                      <th className="p-4 font-bold text-center">Items</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 text-sm font-mono text-slate-600">{order._id ? order._id.toString().substring(0, 10) : 'N/A'}...</td>
                        <td className="p-4 text-sm text-slate-600">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</td>
                        <td className="p-4 text-sm font-medium text-slate-800">₹{order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}</td>
                        <td className="p-4">
                          {order.isPaid ? (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">{order.paidAt ? new Date(order.paidAt).toLocaleDateString() : 'Paid'}</span>
                          ) : (
                            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-bold">Not Paid</span>
                          )}
                        </td>
                        <td className="p-4">
                          {order.isDelivered ? (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">{new Date(order.deliveredAt).toLocaleDateString()}</span>
                          ) : (
                            <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded font-bold">Pending</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex -space-x-2 justify-center">
                            {order.orderItems.slice(0, 3).map((item, index) => (
                              <img key={index} src={item.image} alt="product" className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 object-cover" title={item.name} />
                            ))}
                            {order.orderItems.length > 3 && (
                              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 text-slate-600 text-xs font-bold flex items-center justify-center">
                                +{order.orderItems.length - 3}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
