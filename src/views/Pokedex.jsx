import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../contexts/UserContext'
import { usePagination } from '../hooks/usePagination'
import PokemonCard from './PokemonCard'
import { useLoaderData } from 'react-router-dom'
import { Form } from 'react-router-dom'


const Pokedex = () => {

  const { user } = useContext(UserContext)
  const { pokemons, types, name, type } = useLoaderData()
  const [pokemonName, setPokemonName] = useState(name ?? '')
  const [pokemonType, setPokemonType] = useState(type ?? '')
  const pokemonsPagination = usePagination(pokemons, 100)

  const handleNameChange = (e) => {
    setPokemonName(e.target.value)
  }

  const handleTypeChange = (e) => {
    setPokemonType(e.target.value)
  }

  useEffect(() => {
    setPokemonName(name ?? '')
  }, [name])

  useEffect(() => {
    setPokemonType(type ?? '')
  }, [type])
  


  return (
    <div>
      <div className='div_img_pokemon'>
        <img className='img_pokemon_logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" alt="Pokemon" />
      </div>
    <div className='pokedex_container'>
    <img className='gengar' src="https://www.pngmart.com/files/13/Pokemon-Charmander-PNG-Pic.png" alt="" />
      <div className='filters'>
        <Form> 
          <div className='search_items'>
          <h3 className='search_h3'>Filter by search</h3>
          <input
          className='input_pokedex'
          type="text"
          name="pokemon_name"
          value={pokemonName}
          onChange={handleNameChange}/>
          <select
          className='select_pokedex'
          name="pokemon_type"
          value={pokemonType}
          onChange={handleTypeChange}>
            {types.map((type) => 
            <option key={type.url} value={type.name}>
              {type.name}
              </option>
            )}
            <option value='' disabled>
              Select type
            </option>
          </select>

          <button className='button_pokedex' type='submit'>
            Search
          </button>
          </div>
        </Form>
      </div>
      <p className='welcome'>
        <span>
          Welcome <strong>{user}</strong>, you can find your favorite pokemon rigth here.
        </span>
      </p>
    </div>
    
    
    <div className='pagination_div'>
        {pokemonsPagination.pages.map((page) => (
          <button
            key={page}
            onClick={() => pokemonsPagination.changePageTo(page)}
            className= 'pagination_numbers'
          >
            {page}
          </button>
        ))}
        
      </div>
    <section className='cards'>
      {pokemonsPagination.listSlice.map(pokemon => <PokemonCard key={pokemon.url} pokemonData={pokemon} />)}
    </section>
    </div>
  )
}

export default Pokedex