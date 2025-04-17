import { ClipboardList, Loader2 } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom'


const HomePage = () => {
  
 
  return (
    <div className='h-screen grid lg:grid-cols-1'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
      <div className="size-56 rounded-lg bg-primary/10 flex items-center justify-center">
                <ClipboardList className="w-50 h-50 text-primary" />
              </div>
        <div className="w-full max-w-md space-y-8">
        <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
             
            </p>
          </div>
          <button type="submit" className="btn btn-primary w-full" >
              { 
              <Link
              to={"/signup"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              
              <span className="hidden sm:inline">Signup</span>
            </Link>
}
            </button>
            <div className="text-center">
            <p className="text-base-content/60">
              Already a user?{" "}
             
            </p>
          </div>
          <button type="submit" className="btn btn-primary w-full" >
              {
              <Link
              to={"/login"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              
              <span className="hidden sm:inline">Login</span>
            </Link>
}
            </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage