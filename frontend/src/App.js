
import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react';

const socket = io.connect("http://localhost:3001")



function App() {
  const [counter, setCounter] = useState(0);
  const [users, setUsers] = useState(0);

  const addOne = () => {
    setCounter(counter + 1); 
    socket.emit("add", counter + 1)
  };

  const subOne = () => {
    setCounter(counter - 1); 
    socket.emit("sub", counter - 1)
  };

  useEffect(() => {
    socket.on("update", (data) => {
      console.log(data)
      if (data && data[1] && data[0] !== undefined) {
        setCounter(data[1]);
        setUsers(data[0]);
      } else {
        console.error('Received invalid count object:', data);
      }
      
    });

    socket.on('upUsers', (data) => {
      if (data && data[0] !== undefined) {
        setUsers(data[0]);
      } else {
        console.error('Received invalid count object:', data);
      }
      
    });
  }, [socket]);

  return (
    <div>
      <button onClick={subOne}> - </button>
      <h1> {counter} </h1>
      <button onClick={addOne}> + </button>
      <h2>{users}</h2>
    </div>
  );
}

export default App;
