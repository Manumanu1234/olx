import { createContext, useState } from "react";

export const Productcontext = createContext(null);



export function Post({ children }) {
    const [productdetails, setproduct] = useState(null);
    return (
        <Productcontext.Provider value={{ productdetails, setproduct }}>
            {children}
        </Productcontext.Provider>

    )

}