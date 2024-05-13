import {ReactNode, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";

import {useAuth} from "../Context/UserAuthContext";

export function PrivateRoute({children} :{children : ReactNode}){
    const { roomDetail }  = useAuth()
    return  roomDetail?<>{children}</> : <Navigate to="/"/>

}