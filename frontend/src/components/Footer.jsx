const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-10 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4"><span className="text-orange-500">Aadithya</span> Super Store</h3>
          <p className="text-sm">Your one-stop smart supermarket. Find products online, explore our virtual aisles, and shop with ease.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/catalog" className="hover:text-orange-400 transition-colors">Products</a></li>
            <li><a href="/offers" className="hover:text-orange-400 transition-colors">Special Offers</a></li>
            <li><a href="/virtual-store" className="hover:text-orange-400 transition-colors">AR Navigation</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-orange-400 transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-orange-400 transition-colors">Return Policy</a></li>
            <li><a href="#" className="hover:text-orange-400 transition-colors">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Store Details</h4>
          <ul className="space-y-2 text-sm">
            <li>1/17C, Akkaranam periyapalayam, Mudhalipalayam Sidco, Trippur - 641 60</li>
            <li>Open Daily: 8 AM - 10 PM</li>
            <li>Email: aadithyastore@gmail.com</li>
            <li>Contact No: 9443256820</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Aadithya Super Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
