import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {

  const [inputVal, setInputVal] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get('/api/notes')
      .then((result) => {
        setNotes(result.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const addNote = () => {
   

    if(inputVal.trim()) {
      const newObj = {
        content: inputVal.trim(),
        important: Math.random() < 0.5
      };

      axios
        .post('/api/notes', newObj)
        .then(response => {
          setNotes(notes.concat(response.data));
        })
        .catch(err => console.log(err));

    };

  };  

  return (
    <div>
        <input type="text" 
          onChange={(e) => setInputVal(e.target.value)} 
          value={inputVal}
        />
        <button onClick={addNote}>
          create
        </button>
        <div>
          {
            notes && notes.map(item => (
              <div key={item.id}>
                <p>content:  {item.content}</p>
                <p>is it important?: {
                  item.important ? 'true' : 'false'
                }</p>
              </div>
            ))
          }
        </div>
    </div>
  )
  
};  

export default App;