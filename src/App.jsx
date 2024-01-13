import { useEffect, useState } from 'react';

const App = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character?page=1')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCharacters(data.results);
      }
      );
  }, []);

  return (
    <main>
      <h1>Personajes de Rick y Morty</h1>
      <div className=''>
        {characters.map((character) => (
          <li key={character.id}>
            <h3>{character.name}</h3>
            <img src={character.image} alt={`Imagen de ${character.name}`} />
            <p>{character.status}</p>
            <p>{character.species}</p>
            <p>{character.gender}</p>
            <p>{character.origin.name}</p>
          </li>
        ))}
      </div>
    </main>
  );
};

export default App;
