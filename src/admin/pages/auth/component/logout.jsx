import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '@/redux/slices/authSlice'
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const dispatch = useDispatch()
     const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/admin");
  };

  return (
    <div className='w-full border border-gray-400'>
    <div>
dsa
    </div>
    <div onClick={handleLogout}>
dad
    </div>

    </div>
  )
}
