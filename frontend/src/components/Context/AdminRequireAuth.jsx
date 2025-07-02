import { useContext } from "react"
import { AdminAuthContext } from "../Context/AdminAuth";
import { Navigate } from "react-router-dom";

export const AdminReqireAuth = ({children}) =>{
    const {user} = useContext(AdminAuthContext);

    if (!user) {
        return <Navigate to={'/login'} />
    }
    return children;
}