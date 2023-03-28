import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from 'react';
import loginContext from "../../Store/loginContext";


function MisPedidos() {

    const {login} = useContext(loginContext);

    
    return(
        <>
        {login ? (
            <p>Hola USUARIO</p>
            ) : (
            <p>No has iniciado sesión</p>
            )}
        </>
    );
}

export default MisPedidos