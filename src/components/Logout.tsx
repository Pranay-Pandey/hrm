import React, {useEffect} from "react";
import { useSessionStorage } from '../utils/useSessionStorage';

export const Logout: React.FC = ()=>{
    const [login, setLogin] = useSessionStorage("login", "");
    const [token, setToken] = useSessionStorage("token", "");
    const [user, setUser] = useSessionStorage(
      "user",
      JSON.stringify({})
    );
  
  function logout(){
    setLogin("false");
    setToken("");
    setUser(JSON.stringify({}));
  }

  useEffect(()=>{
        logout();
        window.location.href="/";
    }, []);

    
    return (
        <>
        </>
    );
}