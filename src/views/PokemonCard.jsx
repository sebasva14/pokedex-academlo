import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const getPokemonById = async (url) => {
  try {
    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonCard = ({ pokemonData }) => {
  const [pokemon, setPokemon] = useState(null)
  const navigate = useNavigate()

  const handleClickNavigate = () => {
    navigate(`/pokedex/${pokemon.id}`, { state: { pokemon } })
  }

  useEffect(() => {
    const loadPokemon = async () => {
      const pokemonInfo = await getPokemonById(pokemonData.url);
  
      setPokemon(pokemonInfo);
    };

    loadPokemon();
  }, []);

  return (
    <>
      {pokemon && (
        <article onClick={handleClickNavigate}>
          <section className='info_container'>
          <div className='img_card_container'>
              <img className='img_cards' src={pokemon?.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
          </div>
            <section className='grid_section'>
              <h2 className='card_h2'>{pokemon.name}</h2><br />
              <h3 className='card_h3'>TYPE</h3>
              <p>{pokemon.types[0].type.name}</p>

              {pokemon.stats.map((stat) => (
                <section key={stat.stat.name}>
                  <h3 className='card_h3'>{stat.stat.name.toUpperCase()}</h3>
                  <p>{stat.base_stat}</p>
                </section>
              ))}
            </section>
          </section>
        </article>
      )}
    </>
  );
};

export default PokemonCard;