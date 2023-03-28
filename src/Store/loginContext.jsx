import React from "react";

const loginContext = React.createContext({
    login: false, 
    setLogin: () => { } 
})

export default loginContext;