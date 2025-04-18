import { useContext } from "react"
import "./Cart.css"
import { StoreContext } from "../../context/StoreContext"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Cart = () => {

  const  {cartItems, food_list, removeFromCart, getTotalCartAmount, url, token} =useContext(StoreContext)
  console.log(cartItems, food_list, "cartItems from cart")
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!token) {
      toast.error('Please login to proceed with checkout', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return
    }
    navigate('/order')
  }

  return (
      <div className="cart">
        <ToastContainer />
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item,index)=>{
            if(cartItems[item._id]>0)
              {
              return (
                <>
                
                 <div className="cart-items-title cart-items-item">
                 <img src={url+"/images/"+item.image} alt="" />
                 <p>{item.name}</p>
                 <p>{item.price}</p>
                 <p>{cartItems[item._id]}</p>
                 <p>₹{item.price*cartItems[item._id]}</p>
                 <p  onClick={()=>removeFromCart(item._id)} className="cross">x</p>
                </div>
                <hr />
                </>
               
              )
            }
          })}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount()===0?0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>₹{getTotalCartAmount()===0? 0 : getTotalCartAmount()+2}</b>
              </div>
              
            </div>
            <button 
              onClick={handleCheckout}
              className={getTotalCartAmount() === 0 ? 'disabled-button' : ''}
              disabled={getTotalCartAmount() === 0}
            >
              PROCEED TO CHECKOUT
            </button>
           
          </div>
          <div className="cart-promocode">
              <div>
                <p>If you have a promo code, Enter it here</p>
                <div className="cart-promocode-input">
                  <input type="text" placeholder="promo code" />
                  <button>Submit</button>
                </div>
              </div>
            </div>
        </div>
      </div>
  )
}

export default Cart
