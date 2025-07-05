import { createContext, useState } from 'react';
import api from '../../Http';

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = JSON.parse(localStorage.getItem('adminInfo'));
        return storedUser ? true : false;
    });
    const [cart, setCart] = useState([]);
    const fetchCart = async () => {
        const cliend = JSON.parse(localStorage.getItem('adminInfo'));
        if (cliend) {
            const id = cliend?.admin?.customer?.id;
            try {
                const res = await api.get(`/cart/product/${id}`);
                setCart(res.data.customer); // কার্ট ডেটা সেভ
            } catch (error) {
                setCart([]);
                console.error("Cart fetch failed", error);
            }
        } else {
            setCart();
        }
    };


    const login = (adminInfo) => {
        localStorage.setItem("adminInfo", JSON.stringify(adminInfo));
        // setUser(user);
        setUser(true);
        fetchCart();
    }

    const logout = () => {
        localStorage.removeItem('adminInfo');
        setUser(false);
        setCart([]);
    }

    return <AdminAuthContext.Provider value={{
        user,
        login,
        logout,
        setUser,
        cart,
        fetchCart,
    }}>
        {children}
    </AdminAuthContext.Provider>
}