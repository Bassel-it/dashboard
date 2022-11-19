import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { SiBmw } from 'react-icons/si';
import { MdOutlineClose } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../contexts/ContextProvider';    

import { links } from '../data/dummy';
function Sidebar() {
  const {activeMenu ,screenSize,setActiveMenu ,currentColor}=useStateContext();

  const activeLink = `flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg bg-cyan-300  text-md m-2`;
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  const closeSidebarforMobile =()=>{
    if(screenSize < 899 && activeMenu)
    setActiveMenu(false)

  }

  return (
    <>
    
      {activeMenu && (<div className="ml-3 h-screen  md:overflow-hidden 
    overflow-auto md:hover:overflow-auto pb-10"> <>
          <div className="flex justify-between items-center">
            <Link to="/" onClick={()=>setActiveMenu(false)} className="items-center 
            gap-3 ml-3 mt-4 flex text-xl font-extrabold 
            tracking-tight dark:text-white text-slate-900">
              <SiBmw className=' scale-150 '/> 
              <span className=' flex  justify-between '><p className=' ml-3 text-blue-900'>B</p>.
              <p className='ml-4 text-red-900'>M</p>.
              <p className='ml-4  text-gray-600'>W</p></span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => {setActiveMenu((prevActiveMenu)=>!prevActiveMenu)}}
                className="text-xl rounded-full p-3
                 hover:bg-light-gray mt-4 block md:hidden" >
                <MdOutlineClose />
              </button>
            </TooltipComponent>
            </div>
            <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400
                 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={closeSidebarforMobile}
                    style={{color:currentColor}}
                    className={({ isActive }) => 
                    (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize   ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
            </></div>)}
            </>
  )
}

export default Sidebar