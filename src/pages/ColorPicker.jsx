import React from 'react';
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';

import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';


// const change = (args) => {
//   document.getElementById('preview').style.backgroundColor = args.currentValue.hex;
  
// };





const CustomColorPicker = ({ id, mode ,change }) =>
 <ColorPickerComponent id={id} mode={mode} modeSwitcher={false} 
 inline showButtons={false} change={change} />;

const ColorPicker = () => {
const {setTheme, setCurrentColor } = useStateContext();
const changeFontColor = (args) => {
  setCurrentColor(args.currentValue.hex)
};
const changeTheme = (args) => {
  setTheme(args.currentValue.hex)
};
  
  return(
  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="App" title="Color Picker" />
    <div  className="text-center">
      <div className="flex justify-center items-center gap-20 flex-wrap">
        <div>
          <p className="text-2xl font-semibold mt-2 mb-4">change Font Color</p>
          <CustomColorPicker id="inline-palette" mode="Palette" change={changeFontColor} />
        </div>
        <div>
          <p className="text-2xl font-semibold mt-2 mb-4">change Theme</p>
          <CustomColorPicker id="inline-picker" mode="Picker" change={changeTheme} />
        </div>
      </div>
    </div>
  </div>
)};

export default ColorPicker;
