import React from 'react';
import './App.css';
import Chat from './Chat';
import io from 'socket.io-client' //importing client-io

 
const socket = io.connect("http://localhost:3001"); //listening to the server end which 
function App() {
  const[userName, setUserName] = React.useState("")
  const[room, setRoom] = React.useState("")
  const[showChat, setShowChat] = React.useState(false)

  const joinRoom = () => {
    if(userName!=="" && room !== ""){
      socket.emit("join_room", room); //emitting the room id
      setShowChat(true)
    }

  }
   
  return (
    <div className='App'>
      {!showChat ?(
      <div className='joinChatContainer'>
        <h4>Join Chat</h4>
        <input type="text" 
              placeholder='John....' 
              onChange={(event) => setUserName(event.target.value)} />
        <input type="text" 
                placeholder='Room id' 
                onChange={(event) => {setRoom(event.target.value)}}/>
        <button onClick={joinRoom}> Join a room </button>
        
      </div>
      ):
      (<Chat socket={socket} userName={userName} room={room} />)}
    </div>
  )
}

export default App;
