
import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react';

const socket = io.connect("http://localhost:3001")



function App() {
  const [counter, setCounter] = useState(0);

  const addOne = () => {
    setCounter(counter + 1); 
    socket.emit("add", counter + 1)
  };

  const subOne = () => {
    setCounter(counter - 1); 
    socket.emit("sub", counter - 1)
  };

  useEffect(() => {
    socket.on("update", (count) => {
      console.log(typeof(count))
      if (count !== undefined) {
        setCounter(count);
      } else {
        console.error('Received invalid count object:', count);
      }
    });
  }, [socket]);

  return (
    <div>
      <button onClick={subOne}> - </button>
      <h1> {counter} </h1>
      <button onClick={addOne}> + </button>
    </div>
  );
}

export default App;
