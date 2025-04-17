import React from 'react'
import { Link } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore'
import { ClipboardList, LogOut, Navigation } from 'lucide-react';

const Navbar = () => {
  const {logout, authUser} = useAuthStore();
  return (
    <header
    className="bg-base-100 border-b border-base-300  w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className='container mx-auto px-4 h-16'>
      <div className='flex items-center justify-between h-full'>
      <div className="flex items-center gap-8">
            <Link to="/taskpage" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Your daily task manager</h1>
            </Link>
      </div>
      <div className='flex items-center gap-2'>
            {authUser && (
              <>
              <Link
									to={"/chat-room"}
									className='bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out'
								>
									<Navigation className='mr-2' size={18} />
									 Chat Room
								</Link>
              
                <button className="flex gap-2 items-center" onClick={logout} >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
      </div>
      </div>
      </div>
    </header>
  ) 
 
  
}

export default Navbar