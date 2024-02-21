import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';


function FormTextExample({onChange}) {

  return (
    <>
    <Row>
        <Col>
      <Form.Control 
        type="text"
        placeholder='Search...'
        onChange= {onChange}
      />
      </Col>
      </Row>
    </>

  );
}

export default FormTextExample;