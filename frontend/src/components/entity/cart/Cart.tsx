import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useTheme } from '../../../context/ThemeContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-8 transition-colors duration-300`}>
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-12 text-center transition-colors duration-300`}>
            <svg
              className={`mx-auto h-16 w-16 ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-4`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6 transition-colors duration-300`}>
              Your cart is empty
            </p>
            <Link
              to="/products"
              className="inline-block bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden transition-colors duration-300`}>
              <table className="w-full">
                <thead>
                  <tr className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'} text-sm uppercase transition-colors duration-300`}>
                    <th className="px-6 py-3 text-left">Product</th>
                    <th className="px-6 py-3 text-center">Price</th>
                    <th className="px-6 py-3 text-center">Quantity</th>
                    <th className="px-6 py-3 text-center">Subtotal</th>
                    <th className="px-6 py-3 text-center">Remove</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {cartItems.map(item => (
                    <tr key={item.productId} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={`/${item.imgName}`}
                            alt={item.name}
                            className={`h-16 w-16 object-contain rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-1`}
                          />
                          <span className={`font-medium ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                          ${item.price.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center justify-center space-x-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-1 w-fit mx-auto transition-colors duration-300`}>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <span aria-hidden="true">-</span>
                          </button>
                          <span className={`${darkMode ? 'text-light' : 'text-gray-800'} min-w-[2rem] text-center transition-colors duration-300`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <span aria-hidden="true">+</span>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-primary font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className={`${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'} transition-colors duration-300`}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 transition-colors duration-300`}>
              <div className="flex justify-between items-center mb-6">
                <span className={`text-xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                  Total
                </span>
                <span className="text-2xl font-bold text-primary">
                  ${getCartTotal().toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className={`flex-1 text-center px-6 py-3 rounded-lg font-medium border-2 ${darkMode ? 'border-gray-600 text-gray-300 hover:border-primary hover:text-primary' : 'border-gray-300 text-gray-700 hover:border-primary hover:text-primary'} transition-colors duration-300`}
                >
                  Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-red-900 hover:text-red-200' : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600'} transition-colors duration-300`}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
