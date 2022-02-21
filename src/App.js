// Jenni Lohi

import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const URL = "https://api.thecatapi.com/v1/"
const API_KEY = '74b19a41-dd42-42ed-8a23-4e4c0a6070fb'

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [breedAddress, setBreedAddress] = useState("abys");
  const [item, setItem] = useState(null)
  const [names, setNames] = useState([])
   
  useEffect(() => {
    const criteria = 'images/search?breed_ids='
    const address = URL + criteria + breedAddress;
    const address2 = URL + 'breeds'

    axios.get(address)
      .then((response) => {
        console.log(response);
        setItem(response.data[0]);
        setIsLoaded(true);
      }).catch(error => {
        setError(error);
    });

    axios.get(address2)
      .then((response) => {
        console.log(response);
        setNames(response.data);
        setIsLoaded(true);
      }).catch(error => {
        setError(error);
    });

  }, [breedAddress])


  if (error) {
    return <p>{error.message}</p>
  } else if (!isLoaded) {
    return <p>Loading...</p>
  } else {
    return (
      <div className='content'>
        <h1>Cat images</h1>
        <label htmlFor="breed-select">Choose a breed! </label>
        <select name="" id="breed-select" onChange={e => setBreedAddress(e.target.value)}>
          {names.map(name => (
            <option value={name.id}>{name.name}</option>
          ))}
        </select>

        <div>
          <h3>{item.breeds[0].name}</h3>
          <img src={item.url} alt="" />
        </div>
      </div>
    );
  }
}

export default App;
