import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useTheme } from '../../../context/ThemeContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const { darkMode } = useTheme();

  const baseText = darkMode ? 'text-light' : 'text-gray-800';
  const baseBg = darkMode ? 'bg-dark' : 'bg-gray-100';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const mutedText = darkMode ? 'text-gray-400' : 'text-gray-500';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  const qtyBg = darkMode ? 'bg-gray-700' : 'bg-gray-200';

  if (items.length === 0) {
    return (
      <div className={`min-h-screen ${baseBg} pt-20 px-4 transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto py-16 text-center">
          <div className={`${mutedText} mb-6`}>
            <svg className="mx-auto h-24 w-24 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className={`text-3xl font-bold ${baseText} mb-3 transition-colors duration-300`}>Your cart is empty</h1>
          <p className={`${mutedText} mb-8 transition-colors duration-300`}>
            Looks like you haven't added anything yet. Browse our smart cat tech!
          </p>
          <Link
            to="/products"
            className="inline-block bg-primary hover:bg-accent text-white px-8 py-3 rounded-md font-medium transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${baseBg} pt-20 pb-16 px-4 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-3xl font-bold ${baseText} transition-colors duration-300`}>Your Cart</h1>
          <button
            onClick={clearCart}
            className={`text-sm ${mutedText} hover:text-red-500 transition-colors`}
            aria-label="Clear all items from cart"
          >
            Clear cart
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {items.map(item => {
            const unitPrice = item.discount ? item.price * (1 - item.discount) : item.price;
            const lineTotal = unitPrice * item.quantity;

            return (
              <div
                key={item.productId}
                className={`${cardBg} rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center gap-4 transition-colors duration-300`}
              >
                {/* Product image */}
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg w-20 h-20 flex-shrink-0 flex items-center justify-center overflow-hidden`}>
                  <img
                    src={`/${item.imgName}`}
                    alt={item.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                {/* Name + price */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold ${baseText} truncate transition-colors duration-300`}>{item.name}</h3>
                  {item.discount ? (
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-sm line-through ${mutedText}`}>${item.price.toFixed(2)}</span>
                      <span className="text-primary font-semibold">${unitPrice.toFixed(2)}</span>
                      <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">
                        {Math.round(item.discount * 100)}% OFF
                      </span>
                    </div>
                  ) : (
                    <span className="text-primary font-semibold mt-1 block">${unitPrice.toFixed(2)}</span>
                  )}
                </div>

                {/* Quantity controls */}
                <div className={`flex items-center space-x-2 ${qtyBg} rounded-lg p-1 transition-colors duration-300`}>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className={`w-8 h-8 flex items-center justify-center ${baseText} hover:text-primary transition-colors`}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    <span aria-hidden="true">-</span>
                  </button>
                  <span className={`min-w-[2rem] text-center ${baseText} transition-colors duration-300`}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className={`w-8 h-8 flex items-center justify-center ${baseText} hover:text-primary transition-colors`}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    <span aria-hidden="true">+</span>
                  </button>
                </div>

                {/* Line total */}
                <div className={`text-right min-w-[5rem] font-bold ${baseText} transition-colors duration-300`}>
                  ${lineTotal.toFixed(2)}
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className={`${mutedText} hover:text-red-500 transition-colors flex-shrink-0`}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>

        {/* Order summary */}
        <div className={`${cardBg} rounded-lg shadow p-6 transition-colors duration-300`}>
          <div className={`flex justify-between items-center border-b ${borderColor} pb-4 mb-4`}>
            <span className={`${mutedText} transition-colors duration-300`}>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
            <span className={`text-xl font-bold text-primary`}>${getTotalPrice().toFixed(2)}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/products"
              className={`flex-1 text-center px-6 py-3 rounded-md border ${darkMode ? 'border-gray-600 text-light hover:border-primary' : 'border-gray-300 text-gray-700 hover:border-primary'} font-medium transition-colors`}
            >
              Continue Shopping
            </Link>
            <button
              className="flex-1 bg-primary hover:bg-accent text-white px-6 py-3 rounded-md font-medium transition-colors"
              onClick={() => alert('Checkout coming soon!')}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
