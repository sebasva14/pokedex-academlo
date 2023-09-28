
import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const Home = () => {
    const [nameValue, setNameValue] = useState("")
    const [nameError, setNameError] = useState(null)
    const { user, saveUser } = useContext(UserContext)

    const handleChange = (e) => {
        const newNameValue = e.target.value;
    
        setNameValue(newNameValue);
        if (newNameValue === '') setNameError("Name is required");
        else if (!/^[A-Z][a-z ]{2,}$/.test(newNameValue))
          setNameError("Start with capital letter.");
        else setNameError(null);
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nameError) {
          saveUser(nameValue)
        } 
    }

  return (
    <div className='container'>
        <div className='img_container'>
            <img src="src/images/pokedex-logo.png" alt="" width="450" />
        </div>
        <div className='welcome_container'>
            <h1 className='hello'>¡Hello trainer!</h1>
            <p className='type'>Type your name to star.</p>
        </div>
        <form
        className='form_home'
        onSubmit={handleSubmit}>
            <input
            className='user_name'
            type="text"
            value={nameValue}
            onChange={handleChange}
            />
            <button className='star_button' type="submit">Star</button>
        </form>
        {nameError && <p className='name_error'>{nameError}</p>}

        {user && <Navigate to="/pokedex" replace />}
    </div>
  )
}

export default Home