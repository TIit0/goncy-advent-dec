
import './App.css';
import { useReducer, useEffect } from 'react';
import { ACTIONS, reducer } from '../utils/functions/reducer';
import Form from "../components/Form/Form"

function App() {

  function lazyInit() {
    return {isModalOpen: false, 
      gifts: JSON.parse(window.localStorage.getItem("giftList")) || []}
  }

  const [state, dispatch] = useReducer(reducer, {}, lazyInit)

  useEffect(() => {
    window.localStorage.setItem("giftList", JSON.stringify(state.gifts))
  }, [state.gifts] )


  return (
    <div className="App">

      <Form
        dispatch={dispatch}
        isModalOpen={state.isModalOpen} />

      <main className='giftList-container'>
        <h1>Regalos:</h1>

        <button
          type="button"
          onClick={() => dispatch({ type: ACTIONS.OPEN_MODAL })}
        >Agregar regalos
        </button>

        <ul>
          {state.gifts.map(gift => (
            <li key={gift.id}>
              <img src={gift.url} alt="default gift"></img>
              <div className='li-text'>
                <p>{gift.name}</p>
                <p className='forWho'>{gift.forWho}</p>
              </div>
              <button
              className='li-button'
              type="button"
              onClick={() => dispatch({type: ACTIONS.REMOVE_GIFT, payload: {id: gift.id}})}
              >X
              </button>
            </li>
          ))}
        </ul>

        {
        (state.gifts.length < 1) ?

        <p className='default-text'>Agrega Regalos!</p> :

        <button
        type="button"
        onClick={() => dispatch({type: ACTIONS.CLEAR_LIST})}
        >Borrar todo
        </button>
        }

      </main>

    </div>
  );
}

export default App;
