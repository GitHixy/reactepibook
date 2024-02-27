import React from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../reducers/theme/themeSlice';


function SwitchExample() {
    const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.value);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    
      <Form.Check 
        type="switch"
        id="custom-switch"
        label="Light/Dark"
        className={`mx-2 text-white`}
        onChange={handleToggle}
        checked={theme === 'dark'}
      />

  );
}

export default SwitchExample;