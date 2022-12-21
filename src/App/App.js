
import './App.css';
import Form from '../components/Form/Form';
import { useReducer, useEffect } from 'react';
import { ACTIONS, reducer } from '../utils/functions/reducer';
import Edit from '../components/Edit/Edit';

function App() {

  function lazyInit() {
    return {isModalOpen: false, gifts: JSON.parse(window.localStorage.getItem("giftList"))}
  }

  const [state, dispatch] = useReducer(reducer, { isModalOpen: false, gifts: [] }, lazyInit)
  console.log(state.gifts)


  useEffect( () =>{
    window.localStorage.setItem("giftList", JSON.stringify(state.gifts))
  }, [state.gifts] );


  return (
    <div className="App">
      {state.isModalOpen ? <Form dispatch={dispatch} /> : null}

      <main>
        <h1>Regalos:</h1>

        <button
          type="button"
          onClick={() => dispatch({ type: ACTIONS.OPEN_MODAL })}
        >Agregar regalo
        </button>

        <ul>
          {state.gifts.map(gift => (
            <li key={gift.id}>
              <img src={gift.url}></img>
              <div className='li-text'>
                <p>{gift.regalo}</p>
                <p style={{ fontSize: "1.8rem" }}>{gift.para}</p>
              </div>
              <div className='li-button-wrapper'>

                <button
                  className='li-button'
                  type="button"> <Edit /> </button>

                <button
                  className='li-button'
                  type="button"
                  onClick={
                    () => dispatch(
                      { type: ACTIONS.REMOVE_GIFT, payload: { id: gift.id } }
                    )}
                >X
                </button>

              </div>
            </li>
          ))}
        </ul>

        {state.gifts.length < 1 ? 

        <p className='default-text'>Agrega Regalos!</p> :

        <button 
        type="button"
        onClick={() => dispatch({type: ACTIONS.CLEAR_LIST})}
        >Borrar todo
        </button>}

      </main>
    </div>
  );
}

export default App;
