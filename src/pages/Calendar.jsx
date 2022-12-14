import React, { useState } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, 
  WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { scheduleData } from '../data/dummy';
import { Header } from '../components';

// eslint-disable-next-line react/destructuring-assignment

const Scheduler = () => {
  const [scheduleObj, setScheduleObj] = useState();


  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const onDragStart = (arg) => {
    // eslint-disable-next-line no-param-reassign
    arg.navigation.enable = true;
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Calendar" />
      <ScheduleComponent
        height="650px"
        showHeaderBar={true}
        currentView='Month'
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={new Date(2021, 0, 10)}
        eventSettings={{ dataSource: scheduleData }}
        dragStart={onDragStart}
        
      >
        <ViewsDirective>
          { ['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={item} />)}
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
      <div className="mt-5">
        <table
          style={{ width: '100%' ,background: '#33373E' ,borderRadius : "15px",padding : "7px" }}
        >
          <tbody>
            <tr style={{ height: '50px' }}>
              <td style={{ width: '100%' ,padding : '7px' }}>
                <DatePickerComponent
                  value={new Date(2022, 11, 24)}
                  showClearButton={false}
                  placeholder="Current Date"
                  floatLabelType="Always"
                  change={change}
                />
              </td>
            </tr>
          </tbody>
        </table>
        </div>
    </div>
  );
};

export default Scheduler;
