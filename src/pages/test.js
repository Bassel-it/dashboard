
import { Ajax, getValue } from '@syncfusion/ej2-base';
import { DataResult, DataSourceChangedEventArgs, Edit, Inject, Page, PageSettingsModel, Toolbar, ColumnDirective, ColumnsDirective, DataStateChangeEventArgs, Grid, GridComponent } from '@syncfusion/ej2-react-grids';
import { } from '@syncfusion/ej2-react-grids';
import * as React from 'react';

export default class test extends React.Component {
  orderService = new OrderService();
  grid ;
 data; 
  toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
 editSettings= { allowEditing: true, allowAdding: true, allowDeleting: true };
 
 pageSettings = { pageSize: 10 };
 renderComplete() {
    if(this.grid && (this.grid.dataSource instanceof Array
        && !(this.grid.dataSource ).length)) {
        const state = { skip: 0, take: 10 };
        this.dataStateChange(state);
    }
}
 dataStateChange(state ) {
  this.orderService.execute(state).then(( gridData ) => {
    if (this.grid) {
        this.grid.dataSource = gridData
    }
  });
}
 dataSourceChanged(state ) {
  if (state.action === 'add') {
    this.orderService.addRecord(state).then(() => state.endEdit());
  } else if (state.action === 'edit') {
    this.orderService.updateRecord(state).then(() => state.endEdit());
  } else if (state.requestType === 'delete') {
    this.orderService.deleteRecord(state).then(() => state.endEdit());
  }
}
 
 render() {
  this.dataStateChange = this.dataStateChange.bind(this);
  this.dataSourceChanged = this.dataSourceChanged.bind(this);
  this.renderComplete = this.renderComplete.bind(this);
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GridComponent 
        dataSource={this.data}
         ref={g => this.grid = g} 
         editSettings={this.editSettings}
          toolbar={this.toolbarOptions} 
          allowPaging={true}
           allowSorting={true}
            pageSettings={this.pageSettings}
          allowGrouping={true} 
          dataStateChange={this.dataStateChange}
          dataSourceChanged={this.dataSourceChanged} 
          dataBound={this.renderComplete}>
          <ColumnsDirective>
            <ColumnDirective field='OrderID' headerText='Order ID' width='120'/>
            <ColumnDirective field='CustomerID' headerText='Customer Name' width='150'/>
            <ColumnDirective field='ShipName' headerText='Ship Name' width='120' />
            <ColumnDirective field='ShipCity' headerText='Ship City' width='150'/>
          </ColumnsDirective>
          <Inject services={[Page, Edit, Toolbar]} />
        </GridComponent>
      </div>
    </div>
  )
}
  };
 
export class OrderService {
 ajax = new Ajax({
    mode: true,
    onFailure: (e) => false,
    type: 'GET'
});
 BASE_URL = '/api/Orders';
 
 execute(state) {
    return this.getData(state);
}
 addRecord(state){
    const add= new Ajax({
        mode: true,
        onFailure: (e) => false,
        type: 'POST'
    });
    return add.send(JSON.stringify(state.data)).then((response) => {
        const data = JSON.parse(response);
        return data;
    });
}
 updateRecord(state)  {
    const update= new Ajax({
        mode: true,
        onFailure: (e) => false,
        type: 'PUT'
    });
    return update.send(JSON.stringify(state.data)).then((response) => {
        const data = JSON.parse(response);
        return data;
    });
}
 deleteRecord(state)  {
    const remove= new Ajax({
        mode: true,
        onFailure: (e) => false,
        type: 'DELETE'
    });
    return remove.send(JSON.stringify((state.data && state.data[0]))).then((response) => {
        const data= JSON.parse(response);
        return data;
    });
}
getData(state) {
    const pageQuery = state.skip ? `$skip=${state.skip}&$top=${state.take}` : `$top=${state.take}`;
    this.ajax.url = `${this.BASE_URL}?${pageQuery}&$inlinecount=allpages&$format=json`;
 
    return this.ajax.send().then((response) => {
        const data = JSON.parse(response);
        return {
            count:  parseInt(getValue('d.__count', data), 10),
            result: getValue('d.results', data)
        };
    });
}
  };
