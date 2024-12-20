import {Col, Row, Container} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LogLevel, HubConnectionBuilder } from '@microsoft/signalr';
import React, { useState } from 'react';
import WaitingRoom from './components/waitingroom'; // Adjust the path as needed



function App() {

    const[conn, setConnection] = useState();

    const joinChatRoom  = async (username, chatroom) => {
       try {
          //  initiate a connection
          const conn = HubConnectionBuilder()
                        .withUrl("http://localhost:5230")
                        .configureLogging(LogLevel.Information)
                        .build();

        // set up
        conn.on("JoinSpecificChatRoom", (username, msg) =>{
          console.log("msg: ", msg);

        })
       } catch (error) {
          console.log(error);
       }
    }

  return (
    <div >
      <main>
        <Container>
            <Row class='px-5 my-5'>
              <Col sm='12'>
                <h1 className='font-weight-light'>Welcome to F1 ChatApp</h1>
              </Col>
            </Row>
            <WaitingRoom></WaitingRoom>
        </Container>
      </main>
    </div>
  );
}

export default App;
