import { createContext, useState } from "react";
 
 export const Autcontext=createContext(null)

 export default function Context({children}){
    const [user, setuser] = useState(null)
    return(
        <Autcontext.Provider value={{user,setuser}}>
            {children}
        </Autcontext.Provider>
    )
 }