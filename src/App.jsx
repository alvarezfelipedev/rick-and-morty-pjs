import { useEffect, useState } from 'react';
import Paginacion from './Components/Paginacion';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const URLinicial = 'https://rickandmortyapi.com/api/character?page=1';
  const fetchCharacters = (URLinicial) => {
    fetch(URLinicial)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCharacters(data.results);
        setInfo(data.info);
      }
      );
  }

  useEffect(() => {
    if (selectedCategory === "") {
      setFilteredData(characters); // Si no hay categoría seleccionada, mostramos todos los datos
    } else {
      const filtered = characters.filter(character => character.gender === selectedCategory);
      setFilteredData(filtered);
    }
  }, [selectedCategory, characters])

  const onPrevious = () => {
    fetchCharacters(info.prev);
  }

  const onNext = () => {
    fetchCharacters(info.next);
  }

  // funcion de busqueda
  const searcher = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value)
  }

  // funcion de filtrado mediante buscador
  const results = !search ? characters : characters.filter((data) => data.name.toLowerCase().includes(search.toLowerCase()))

  const getOrigenText = (name) => {
    if (name.toLowerCase() === 'unknown') {
      return 'Desconocido'
    } else return name
  }

  const getGenderText = (gender) => {
    if (gender.toLowerCase() === 'male') {
      return 'Masculino';
    } else if (gender.toLowerCase() === 'female') {
      return 'Femenino'
    } else return 'Desconocido'
  }

  useEffect(() => {
    fetchCharacters(URLinicial);
    setFilteredData(URLinicial);
  }, [])

  return (
    <main>
      <div>
        <h1 className='text-center font-serif text-3xl'>Personajes de Rick y Morty</h1>
      </div>
      <Paginacion prev={info.prev} next={info.next} onPrevious={onPrevious} onNext={onNext} />
      <input type="text" placeholder="Type here" className="mt-3 ml-5 input input-bordered w-full max-w-xs" value={search} onChange={searcher} />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Female</option>
        <option value="A">Male</option>
        <option value="B">Genderless</option>
        {/* Agrega más opciones según tus necesidades */}
      </select>

      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 m-5">
        {results.map((character) => (
          <div key={character.id}>
            <img src={character.image} alt={`Imagen de ${character.name}`} />
            <h2 className='text-2xl'>{character.name}</h2>
            <div className='mt-1'>
              <p>Especie: {character.species}</p>
              <p>Género: {getGenderText(character.gender)}</p>
              <p>Origen: {getOrigenText(character.origin.name)}</p>
            </div>
          </div>
        ))}
      </section>
      <Paginacion prev={info.prev} next={info.next} onPrevious={onPrevious} onNext={onNext} />
    </main>
  );
};

export default App;
