
import './App.css';
import Form from "../components/Form/Form";
import { useReducer, useEffect } from 'react';
import { ACTIONS, reducer } from "../utils/functions/reducer"

function App() {

  const [state, dispatch] = useReducer(reducer, {}, lazyInit);

  function lazyInit() {
    return {
      isModalOpen: false,
      gifts: JSON.parse(window.localStorage.getItem("giftList")) || [],
      quantity: 0,
      url: null,}
  }
  

  useEffect(() => {

    window.localStorage.setItem("giftList", JSON.stringify(state.gifts))
  }, [state.gifts])



  return (
    <>
      {state.isModalOpen ? <Form state={state} dispatch={dispatch} /> : null}

      <div className="App">
        <main className="gift-wrapper">

          <h1>Regalos:</h1>
          <button type="button"
            onClick={() => dispatch({ type: ACTIONS.OPEN_MODAL })}>Agregar regalo</button>

          <ul>
            {state.gifts.map(gift => (
              <li key={gift.id}>
                <img src={gift.url} alt="gift default"></img>
                <p>{gift.name}</p>

                <button
                  className='gift-button'
                  onClick={() =>
                    dispatch({ type: ACTIONS.REMOVE_GIFT, payload: { id: gift.id } })}>X</button>
              </li>
            ))}
          </ul>
          {state.gifts.length < 1 ?
            <p className='default-text'>Agrega Regalos!</p> :

            <button
              type="button"
              onClick={() => dispatch({type: ACTIONS.CLEAR_LIST})}>Borrar Todo
              </button>
          }
        </main>
      </div>
    </>

  );
}

export default App;
