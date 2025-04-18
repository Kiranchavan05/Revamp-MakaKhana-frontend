import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
export const StoreContext = createContext(null);
import axios from "axios"

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url="http://localhost:4000"
  const [token, setToken]=useState("")
  const [food_list, setFoodList]=useState([])
  // console.log("tokeenn", token)

  const addToCart =async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url+'/api/cart/add', {itemId}, {headers:{token}})
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token){
      await axios.post(url+"/api/cart/remove", {itemId}, {headers:{token}})
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () =>{
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data)

  }

  const clearCart = () => {
    setCartItems({});
  }

  const handleSetToken = (newToken) => {
    setToken(newToken);
    if (!newToken) {
      clearCart();
    }
  }

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
      if (response.data.success) {
        setCartItems(response.data.cartData || {})
      }
    } catch (error) {
      console.error("Error loading cart:", error)
      setCartItems({})
    }
  }

  useEffect(()=>{
      
      async function loadData() {
        await fetchFoodList()
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
          handleSetToken(storedToken)
          await loadCartData(storedToken)
       }
        
      }
      loadData();
  },[])
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken: handleSetToken,
    loadCartData
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
