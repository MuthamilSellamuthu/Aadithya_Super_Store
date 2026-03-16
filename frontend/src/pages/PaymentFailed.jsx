import { Link } from 'react-router-dom';

const PaymentFailed = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center max-w-lg">
      <div className="w-24 h-24 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Payment Failed</h1>
      <p className="text-slate-600 mb-8">
        We were unable to process your payment. Please try again or contact support if the problem persists.
      </p>
      <div className="space-x-4">
        <Link to="/cart" className="inline-block bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
          Go to Cart
        </Link>
        <Link to="/" className="inline-block text-slate-600 font-bold py-3 px-8 hover:text-slate-900 transition-colors">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailed;
