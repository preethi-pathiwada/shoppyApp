import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart

      const onRemoveAllCartItems = () => {
        removeAllCartItems()
      }

      const getTotalAmount = () => {
        const priceList = cartList.map(obj => obj.quantity * obj.price)

        if (cartList !== []) {
          const totalAmount = priceList.reduce((price, acc) => price + acc)
          return totalAmount
        }
        return null
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  className="remove-all-button"
                  onClick={onRemoveAllCartItems}
                >
                  Remove All
                </button>
                <CartListView />
                {/* TODO: Add your code for Cart Summary here */}
                <div className="order-summary-container">
                  <h1 className="total">
                    Order Total:
                    <span className="amount"> Rs{getTotalAmount()}/-</span>
                  </h1>

                  <p className="items">{cartList.length} items in cart</p>
                  <button className="shop-now-button">Checkout</button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
