import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const index = cartList.findIndex(eachObj => eachObj.id === id)
    cartList.splice(index, 1)
    this.setState({cartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedList = cartList.map(obj => {
      if (obj.id === id) {
        return {...obj, quantity: obj.quantity + 1}
      }
      return obj
    })
    this.setState({cartList: updatedList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedList = cartList.map(obj => {
      if (obj.id === id && obj.quantity === 1) {
        return null
      }
      if (obj.id === id && obj.quantity > 1) {
        return {...obj, quantity: obj.quantity - 1}
      }
      return obj
    })
    const filteredList = updatedList.filter(obj => obj !== null)

    this.setState({cartList: filteredList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const {id} = product
    //   TODO: Update the code here to implement addCartItem
    const item = cartList.find(eachObj => eachObj.id === id)
    if (item === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const updatedList = cartList.map(obj => {
        if (obj.id === id) {
          return {...obj, quantity: obj.quantity + 1}
        }
        return obj
      })
      this.setState({cartList: updatedList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
