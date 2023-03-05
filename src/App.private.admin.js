import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const PrivateAdmin = ({children}) => {

 const [isLogin, setIsLogin] = useState(true)

    const navigate = useNavigate()

    useEffect(()=> {
    if(localStorage.getItem('@userLogin')) {
        setIsLogin(true)
    } else {
        setIsLogin(false)
    }
    }, [])

    return JSON.parse(localStorage.getItem('@userLogin')).user.role === "admin" ? children : alert("You have not an access")
}

export default PrivateAdmin