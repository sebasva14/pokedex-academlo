import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'

const getPokemonById = async (id) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonDetail = () => {
  const { id } = useParams()
  const { state } = useLocation()
  const [pokemon, setPokemon] = useState(null) 

  useEffect(() => {
    const loadData = async () => {
      const pokemon = await getPokemonById(id)
      setPokemon(pokemon)
    }

    if(!state?.pokemon) loadData()
    else setPokemon(state.pokemon)
  }, [])


  return (
    <div className='pokemon_detail'>
      {pokemon && (
        <>
          <div className='img_detail'>
            <img
            className='pokemon_img'
            src={pokemon?.sprites.other['official-artwork'].front_default} 
            alt={pokemon.name} />
          </div>
          <section>
            <section className='detail_info1'>
              <h2 className='pokemon_name_detail'>{pokemon.name}</h2>
              <h3 className='pokemon_type_h3'>Type</h3>
              <p className='pokemon_type_detail'>{pokemon.types[0].type.name}</p>
            </section>
          </section>

          <section className='detail_info2'>
              {pokemon.stats.map((stat) => (
                <section key={stat.stat.name}>
                  <h3 className='pokemon_stat_detail'>{stat.stat.name.toUpperCase()}</h3>
                  <p className='pokemon_numbers'>{stat.base_stat}</p>
                </section>
              ))}
          </section>
        </>
      )}
    </div>
  )
}

export default PokemonDetail