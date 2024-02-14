import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState} from 'react';

function FormTextExample({onChange}) {

    const [value, setValue] = useState('');
    const [hasBeenActive, setHasBeenActive] = useState(false);

    const handleChange = ({target:{value}}) => {
        setValue(value) 
        if (value.length > 0) setHasBeenActive(true)
        onChange(value);
    }

  return (
    <>
    <Row>
        <Col>
      <Form.Control
        className= {`mt-2`}
        type="text"
        placeholder='Search...'
        onChange= {handleChange}
      />
      </Col>
      </Row>
    </>

  );
}

export default FormTextExample;