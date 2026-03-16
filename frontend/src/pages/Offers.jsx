import { Link } from 'react-router-dom';

const Offers = () => {
  const promotions = [
    {
      id: 1,
      title: "Weekend Special",
      description: "Get 20% off on all fresh dairy products including milk, cheese, and yogurt.",
      code: "DAIRY20",
      image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=500",
      bg: "bg-blue-50 text-blue-900 border-blue-200"
    },
    {
      id: 2,
      title: "Snack Time Festival",
      description: "Buy 1 Get 1 FREE on selected branded chips, biscuits, and chocolates.",
      code: "BOGO-SNACKS",
      image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=500",
      bg: "bg-yellow-50 text-yellow-900 border-yellow-200"
    },
    {
      id: 3,
      title: "Fresh Harvest",
      description: "Flat 10% discount on organic farm-fresh fruits and vegetables.",
      code: "FRESH10",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=500",
      bg: "bg-green-50 text-green-900 border-green-200"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Exclusive <span className="text-orange-500">Offers</span></h1>
        <p className="text-lg text-slate-600">Discover amazing discounts on your favorite products. Use promo codes at checkout to save big!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {promotions.map(promo => (
          <div key={promo.id} className={`rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow relative ${promo.bg}`}>
            <div className="h-48 overflow-hidden relative">
              <img src={promo.image} alt={promo.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
              <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Limited Time
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
              <p className="mb-6 opacity-80">{promo.description}</p>
              
              <div className="bg-white/60 border border-white rounded-lg p-3 flex justify-between items-center mb-4">
                <span className="text-sm font-medium opacity-80">Promo Code:</span>
                <span className="font-mono font-bold text-lg select-all px-2 py-1 bg-white rounded border border-slate-200">{promo.code}</span>
              </div>
              
              <Link to="/catalog" className="block w-full text-center py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-sm">
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white p-8 md:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-black opacity-10 rounded-full blur-2xl"></div>
        
        <div className="z-10 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-2">Subscribe to our Newsletter</h2>
          <p className="text-orange-100 max-w-lg">Get notified about our latest weekly deals, flash sales, and exclusive online promotions directly to your inbox.</p>
        </div>
        <div className="z-10 w-full md:w-auto">
          <form className="flex w-full max-w-sm ml-auto bg-white rounded-lg overflow-hidden shadow-sm p-1">
            <input type="email" placeholder="Your email address" className="flex-1 px-4 py-3 text-slate-800 focus:outline-none" required />
            <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-6 font-bold transition-colors rounded-md">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Offers;
