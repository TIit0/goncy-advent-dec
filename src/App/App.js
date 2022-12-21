
import './App.css';
import Form from '../components/Form/Form';
import { useReducer, useEffect } from 'react';
import { ACTIONS, reducer } from '../utils/functions/reducer';
import Edit from '../components/Edit/Edit';

function App() {

  const [state, dispatch] = useReducer(reducer, {}, lazyInit);
  console.log("state:" , state)


  useEffect(() => {
    window.localStorage.setItem("giftList", JSON.stringify(state.gifts))
  }, [state.gifts]);


  function lazyInit() {
    return {
      isModalOpen: false,
      gifts: JSON.parse(window.localStorage.getItem("giftList")) || [],
      edit: {
        isEditOn: false,
      }
    }
  }


  return (
    <div className="App">

      {state.isModalOpen ? <Form dispatch={dispatch} edit={state.edit} /> : null}

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
                  onClick={() => {
                    console.log(gift)
                    return dispatch({
                      type: ACTIONS.EDIT_GIFT, payload: {
                        isEditOn: true,
                        gift
                      }
                    })
                  }}
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
            onClick={() => dispatch({ type: ACTIONS.CLEAR_LIST })}
          >Borrar todo
          </button>}

      </main>
    </div>
  );
}

export default App;
