import {createContext, useContext, useState} from "react";
import {ReactNode} from "react";

type useAuthProviderProps = {
    children : ReactNode
}

const userAuthContext  = createContext()

export function useAuth(){
    return useContext(userAuthContext)
}

export function UseAuthProvider({children} : useAuthProviderProps){
    const [roomDetail, setRoomDetail] = useState("")

    return(
        <userAuthContext.Provider value={{setRoomDetail, roomDetail}}>
            {children}
        </userAuthContext.Provider>
    )
}