import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currency = 'Rs. '; // Simply change with any symbol currency
    const deliveryFee = 250;
    const backendUrl = "https://68e4ce40d1243764ea24fd39--buyandsellgoods.netlify.app"
    // const backendUrl = "https://buy-and-sell-pre-owned-goods-backend.onrender.com";
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const [userData, setUserData] = useState(true);

  console.log(token);
  

    
    const loadProfile = async () => {
        try {
          const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
            headers: { token },
          });
    
          if (data.success) {
            setUserData(data.userData);
          } else {
            toast.error(data.message);
          }
        } catch (error) {}
    };
    
      const loadAllUsers = async () => {
        try {
          const { data } = await axios.get(backendUrl + "/api/user/all-users");
          if (data.success) {
            console.log(data.users);
            
            setAllUsers(data.users);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error(error);
          toast.error("Failed to load users");
        }
    };

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Select Product Size");
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + "/api/cart/add", { itemId, size }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {}
            }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {}
            }
        }
        return totalAmount;
    };

    const getProductsData = async () => {
        try {
            const {data} = await axios.get(backendUrl + "/api/product/list");
            if (data.success) {
                console.log(data.product);
                
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + "/api/cart/get", {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            } else {
                setCartItems({});
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setCartItems({});
        }
    };    

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        if (token) {
            getUserCart(token);
        } else {
            setCartItems({});
        }
    }, [token]);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (!token && savedToken) {
            setToken(savedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
          loadProfile();
        } else {
          setUserData(false);
        }
      }, [token]);

      useEffect(() => {
        loadAllUsers();
      }, []);

    const value = {
        products,
        currency,
        deliveryFee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token, setToken,
        userData, allUsers,
        setUserData,
        loadProfile,
        
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
