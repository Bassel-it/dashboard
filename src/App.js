import React , { useEffect } from 'react'
import { BrowserRouter ,Routes ,Route } from 'react-router-dom'
import {FiSettings} from 'react-icons/fi'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { Navbar, Sidebar , Footer, ThemeSettings} from './components';
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid,
   Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker,
    ColorMapping, Editor } from './pages';
import { useStateContext } from './contexts/ContextProvider';    
import './app.css'
import '../node_modules/@syncfusion/ej2-material-dark-theme/styles/material-dark.css';

function App() {
  const {activeMenu ,theme,themeSettings, setThemeSettings, currentColor}=useStateContext()

  return (
    <div>
      <BrowserRouter>
      <div className="flex  relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{zIndex : '1000'} }>
          <TooltipComponent content="Settings" position='Top'>
            <button
            type="button"
            onClick={()=>setThemeSettings(true)}
            className="text-2xl  text-white p-3 hover:drop-shadow-xl
             hover:bg-light-gray"
            style={{backgroundColor : currentColor , borderRadius : '55%'}}>
              <FiSettings/>
            </button>
          </TooltipComponent>
        </div>
        {activeMenu?
       (<div style={{backgroundColor : theme}} className="w-72 fixed sidebar dark:bg-secondary-dark-bg
         "><Sidebar/></div>)
       :(<div className="w-0 dark:bg-secondary-dark-bg">
       <Sidebar/>
     </div>)}
     <div className={`dark:bg-main-bg bg-main-bg min-h-screen w-full 
     ${activeMenu? 'md:ml-72':'flex-2'}`}>
      <div style={{backgroundColor : theme}} className='fixed md:static dark:bg-main-dark-bg
      navbar w-full'>
        <Navbar/>
      </div>
     <div>
      {themeSettings&&<ThemeSettings/>}
      <Routes>
        {/* Dashboard */}
        <Route path='/' element={<Ecommerce/>}/>
        <Route path='/ecommerce' element={<Ecommerce/>}/>
        {/* pages */}
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/employees' element={<Employees/>}/>
        <Route path='/customers' element={<Customers/>}/>

        {/* Apps */}
        <Route path='/kanban' element={<Kanban/>}/>
        <Route path='/editor' element={<Editor/>}/>
        <Route path='/calendar' element={<Calendar/>}/>
        <Route path='/color-picker' element={<ColorPicker/>}/>
        

        {/* Charts */}
        <Route path='/line' element={<Line/>}/>
        <Route path='/area' element={<Area/>}/>
        <Route path='/bar' element={<Bar/>}/>
        <Route path='/pie' element={<Pie/>}/>
        <Route path='/financial' element={<Financial/>}/>
        <Route path='/color-mapping' element={<ColorMapping/>}/>
        <Route path='/pyramid' element={<Pyramid/>}/>
        <Route path='/stacked' element={<Stacked/>}/>


      </Routes>

     </div>
     <Footer/>

     </div>
      </div>
      </BrowserRouter>
      </div>
  )
}

export default App
