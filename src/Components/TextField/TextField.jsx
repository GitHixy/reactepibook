import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import classes from "./TextField.module.css";
import { useState, useEffect } from 'react';

function FormTextExample({onChange}) {

    const [value, setValue] = useState('');
    const [hasBeenActive, setHasBeenActive] = useState(false);
const inputClassName = `${classes.inputDefault} ${value.length > 0 ? classes.inputActive
     : hasBeenActive ? classes.inputEmptyAfterinput : ''}` 

    const handleChange = ({target:{value}}) => {
        console.log(value)
        setValue(value) 
        if (value.length > 0) setHasBeenActive(true)
        onChange(value);
    }

    useEffect(() => {
    console.log(hasBeenActive, inputClassName)
    })

  return (
    <>
    <Row>
        <Col>
      <Form.Label htmlFor="inputPassword5">I</Form.Label>
      <div className= {inputClassName}>
      <Form.Control
        className= 'w-25'
        type="text"
        placeholder='Search...'
        onChange= {handleChange}
      />
      </div>
      </Col>
      </Row>
    </>

  );
}

export default FormTextExample;