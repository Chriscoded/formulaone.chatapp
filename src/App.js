import {Col, Row, Container} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LogLevel, HubConnectionBuilder } from '@microsoft/signalr';
import React, { useState } from 'react';
import WaitingRoom from './components/waitingroom'; // Adjust the path as needed
import ChatRoom from './components/ChatRoom';



function App() {

    const[conn, setConnection] = useState();
    const[messages, setMessages] = useState([]);

    const joinChatRoom  = async (username, chatroom) => {
       try {
          //  initiate a connection
          const conn = new HubConnectionBuilder()
                        .withUrl("https://localhost:44326/chat")
                        .configureLogging(LogLevel.Information)
                        .build();

        // set up
        conn.on("ReceiveMessage", (username, msg) =>{
          console.log("msg: ", msg);
          setMessages(messages => [...messages, {username,msg}])
        });

        conn.on("ReceiveSpecificMessage", (username, msg) =>{
          setMessages(messages => [...messages, {username,msg}])
        });

        await conn.start();
        await conn.invoke("JoinSpecificChatRoom", {username, chatroom});

        setConnection(conn);

       } catch (error) {
          console.log(error);
       }
    }

    const sendMessage = async(message) =>{
      try {
        await conn.invoke("SendMessage", message);
      } catch (error) {
        console.log(error)
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
            { !conn
              ? <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
              : <ChatRoom messages={messages} sendMessage={sendMessage}></ChatRoom>
            }
            
        </Container>
      </main>
    </div>
  );
}

export default App;
