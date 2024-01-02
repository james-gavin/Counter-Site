
import './App.css';
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001")

const counter= 0 

function App() {
  const addOne = () => {
    //socket.emit()
  };

  return (
    <div>
      <button> - </button>
      <h1> {counter} </h1>
      <button onClick={addOne}> + </button>
    </div>
  );
}

export default App;
