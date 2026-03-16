import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
    brand: '',
    image: '',
    stock: '',
    aisle: '',
    section: '',
    navigationLink: '',
    manufacturingDate: '',
    expiryDate: ''
  });

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      quantity: '',
      category: '',
      brand: '',
      image: '',
      stock: '',
      aisle: '',
      section: '',
      navigationLink: '',
      manufacturingDate: '',
      expiryDate: ''
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      brand: product.brand,
      image: product.image,
      stock: product.stock,
      aisle: product.aisle,
      section: product.section,
      navigationLink: product.navigationLink || '',
      manufacturingDate: product.manufacturingDate ? product.manufacturingDate.substring(0, 10) : '',
      expiryDate: product.expiryDate ? product.expiryDate.substring(0, 10) : ''
    });
    setIsEditing(true);
    setCurrentId(product._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateProduct(currentId, formData);
      } else {
        await createProduct(formData);
      }
      setShowModal(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-500">Manage your store products and inventory</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-bold">Product</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Price</th>
                <th className="p-4 font-bold">Stock</th>
                <th className="p-4 font-bold">Location</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="6" className="p-8 text-center text-slate-500">Loading products...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan="6" className="p-8 text-center text-slate-500">No products found. Add your first product!</td></tr>
              ) : (
                products.map(product => (
                  <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover border border-slate-200" />
                        <div>
                          <p className="font-bold text-slate-800">{product.name}</p>
                          <p className="text-xs text-slate-500">{product.brand} • {product.quantity}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600">{product.category}</td>
                    <td className="p-4 text-sm font-medium text-slate-800">${product.price.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        product.stock > 10 ? 'bg-green-100 text-green-700' :
                        product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-600 truncate max-w-[150px]">
                      {product.aisle} • {product.section}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(product)}
                          className="text-blue-500 hover:bg-blue-50 p-2 rounded transition-colors"
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
                          title="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl my-8">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-700 border-b pb-2">Basic Information</h3>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Product Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Price *</label>
                      <input type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Stock *</label>
                      <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
                      <input type="text" name="category" value={formData.category} onChange={handleInputChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Brand *</label>
                      <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Quantity/Weight (e.g., 500g, 1L) *</label>
                      <input type="text" name="quantity" value={formData.quantity} onChange={handleInputChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Image URL *</label>
                    <input type="text" name="image" value={formData.image} onChange={handleInputChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                  </div>
                </div>

                {/* Location & Details */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-700 border-b pb-2">Location & Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Aisle *</label>
                      <input type="text" name="aisle" placeholder="e.g., Aisle 3" value={formData.aisle} onChange={handleInputChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Section *</label>
                      <input type="text" name="section" placeholder="e.g., Dairy" value={formData.section} onChange={handleInputChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">VR Navigation Link (3DVista/Kuula)</label>
                    <input type="url" name="navigationLink" placeholder="https://" value={formData.navigationLink} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Mfg Date</label>
                      <input type="date" name="manufacturingDate" value={formData.manufacturingDate} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                      <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-black transition-colors shadow-sm">
                  {isEditing ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
