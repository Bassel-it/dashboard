import React, { createRef, useRef, useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, 
  DataResult, DataSourceChangedEventArgs ,Grid,
  Page, Selection, Inject, Edit, Toolbar, Sort, Filter, restoreFocus }
   from '@syncfusion/ej2-react-grids';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { BiErrorCircle } from 'react-icons/bi';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2/data';
import { customersData, customersGrid } from '../data/dummy';
import database from '../customer.json'
import { Header } from '../components';
import axios from 'axios';
import { addOrder,deleteOrder,updateOrder } from '../customertableorder';
import { GiConsoleController } from 'react-icons/gi';


const Customers = () => {
  // const baseUrl ='http://localhost:3000'
  // const data =new DataManager({
  //   adaptor : new UrlAdaptor(),
  //   insertUrl : baseUrl + '/customers/insert',
  //   removeUrl : baseUrl + '/customers/delete' ,
  //   updateUrl : baseUrl + '/customers/update' ,
  //   url : baseUrl + '/customers'

  // })
  const [data,setData]=useState()
  const [error,setError]=useState('')
  let grid=useRef()
  const selectionsettings = { persistSelection: true };
  const   toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  const  editSettings= { allowEditing: true, allowAdding: true, allowDeleting: true };

  const onsourcechange=(state)=>  {
  
    console.log(state,grid); //should log to the console
    if(state.requestType==="save"){
    if (state.action === "add") {
      addOrder(state.data).then((res) => refreshGrid());
    } else if (state.action === "edit") {
      updateOrder(state.data).then((res) => refreshGrid());
    }} else if (state.requestType === "delete") {
      deleteOrder(state.data[0].CustomerID).then((res) =>{console.log("finish delete",res); refreshGrid()});
    }
  }
  const refreshGrid=()=>{
    fetch("http://localhost:8080/api/customers").
    then(res=>res.json()).
    then((d)=>{      
      return {count :d.length , result : d}}).
    then((data)=>setData(data.result)).catch(err=> setError(err.message))
// console.log("refresh done",grid.current.props.dataSource)
  }
  
  useEffect(()=>{
    // console.log("use effect start")
    
    refreshGrid()

  },[])
  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      {error&&(<div className='flex text-red-500  '>
          <TooltipComponent content="error Message" position='LeftCenter'>
          <BiErrorCircle className=' scale-150'/><span className='text-l'>{error}</span>
          </TooltipComponent>
          </div>  
        )}
      <GridComponent
        dataSource={data}
        ref={grid} 
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editSettings}
        allowSorting
        // dataStateChange={()=>{console.log('igg')}}
        dataSourceChanged={onsourcechange}
      >
       
        <ColumnsDirective>
        <ColumnDirective {...{type: 'checkbox', width: '50'}} />
         <ColumnDirective {...{ field: 'CustomerID',
    headerText: 'Customer ID',
    width: '140',
    textAlign: 'Center',
    isPrimaryKey: true,
  }} />
         <ColumnDirective field='CustomerName' headerText="Customer Name" />
         <ColumnDirective field='CustomerEmail' headerText="Customer Email" />
         <ColumnDirective field='ProjectName' headerText="Project Name" />
         <ColumnDirective field='Status' headerText="Status" />
         <ColumnDirective field='Location' headerText="Location" />
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
