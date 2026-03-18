import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useTheme } from '../../../context/ThemeContext';
import PrivacyNotice from '../../PrivacyNotice';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Privacy notice banner */}
        <PrivacyNotice />

        <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p className="text-xl mb-6">Your cart is empty</p>
            <Link
              to="/products"
              className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden transition-colors duration-300`}>
              <table className="w-full">
                <thead>
                  <tr className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} text-sm uppercase`}>
                    <th className="py-3 px-4 text-left">Product</th>
                    <th className="py-3 px-4 text-right">Price</th>
                    <th className="py-3 px-4 text-center">Quantity</th>
                    <th className="py-3 px-4 text-right">Subtotal</th>
                    <th className="py-3 px-4 text-center">Remove</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {cartItems.map(item => (
                    <tr key={item.productId}>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={`/${item.imgName}`}
                            alt={item.name}
                            className="w-14 h-14 object-contain rounded"
                          />
                          <span className={`font-medium ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className={`py-4 px-4 text-right ${darkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="py-4 px-4">
                        <div className={`flex items-center justify-center space-x-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg p-1 w-fit mx-auto transition-colors duration-300`}>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className={`w-7 h-7 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors`}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            -
                          </button>
                          <span className={`min-w-[2rem] text-center ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className={`w-7 h-7 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors`}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className={`py-4 px-4 text-right font-semibold text-primary`}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-red-500 hover:text-red-400 transition-colors"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cart total */}
            <div className={`flex justify-end ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 w-full sm:w-72 space-y-3 transition-colors duration-300`}>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 justify-between">
              <Link
                to="/products"
                className={`px-5 py-2 rounded-lg border font-medium transition-colors ${
                  darkMode
                    ? 'border-gray-600 text-gray-300 hover:border-primary hover:text-primary'
                    : 'border-gray-300 text-gray-700 hover:border-primary hover:text-primary'
                }`}
              >
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
