import {Col, Row, Container} from 'react-bootstrap';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div >
      <main>
        <Container>
            <Row class='px-5 my-5'>
              <Col sm='2'>
                <h1 className='font-weight-light'>Welcome to F1 ChatAppS</h1>
              </Col>
            </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
