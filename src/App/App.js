
import './App.css';
import { useReducer, useEffect } from 'react';
import Form from '../components/Form/Form';
import { ACTIONS, reducer } from '../utils/functions/reducer';
import Edit from '../utils/imgs/svgs/Edit';

function App() {
  const [state, dispatch] = useReducer(reducer, {}, lazyInit);

  function lazyInit() {
    return {
      isModalOpen: false,
      giftList: JSON.parse(window.localStorage.getItem("giftList")) || [],
      editMode: {
        isActive: false,
        giftToEdit: null,
      },
    }
  }

  useEffect(() => {
    window.localStorage.setItem("giftList",JSON.stringify(state.giftList))
  }, [state.giftList] )

  console.log(state.giftList)
  return (
    <div className="App">

      {
      state.isModalOpen ?
      <Form dispatch={dispatch} editMode={state.editMode}/>
      : null
      }

      <main className='gift-list'>
        <h1>Regalos:</h1>

        <button
          onClick={() => dispatch({ type: ACTIONS.OPEN_MODAL })}>
          Agregar Regalo
        </button>

        <ul>
          {state.giftList.map(gift => (
            <li key={gift.id}>
              <img src={gift.url} />

              <div className='li-text'>
                <p>
                  {gift.cantidad > 1 ? `${gift.regalo} x${gift.cantidad}` : gift.regalo}
                </p>
                <p>{gift.para}</p>
              </div>

              <div className='li-buttons'>
                <button /* edit gift button */
                  className='gift-button'
                  type="button"
                  onClick={() => dispatch({
                    type: ACTIONS.OPEN_EDIT,
                    payload: {gift}
                  })}
                >{<Edit />}
                </button>


                <button /*delete gift button */
                  className='gift-button'
                  type="button"
                  onClick={
                    () => dispatch({
                      type: ACTIONS.REMOVE_GIFT,
                      payload: { id: gift.id }
                    })
                  }
                >X
                </button>
              </div>

            </li>
          ))}
        </ul>

        {
        state.giftList.length < 1 ?

        <p className='default-text'>Agrega Regalos!</p> :

        <button
        type="button"
        onClick={() => dispatch({type: ACTIONS.CLEAR})}
        >Borrar todo
        </button>
        }
      </main>
    </div>
  );
}

export default App;
