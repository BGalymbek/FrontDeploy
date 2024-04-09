import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)

    const navigate = useNavigate();

    let loginUser = async (e)=> {
        e.preventDefault()
        let response = await fetch('https://sdudorm-6a4f40c20ef7.herokuapp.com/api/login/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
        })
        let data = await response.json()

        console.log(data);

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            // console.log(authTokens.user.is_staff);
            // Cookies.set('refreshToken', jwtDecode(data.refresh), { expires: 30 });
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/main-page')
        }else{
            alert('Something went wrong!')
        }
    }

    console.log(authTokens);


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/')
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    return(
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;