
import './App.css';
import { useReducer, useEffect } from "react"
import Form from '../components/Form/Form';
import { ACTIONS, reducer } from '../utils/functions/reducer';
import Editsvg from '../utils/Svgs/Editsvg/Editsvg';


function App() {
  const [state, dispatch] = useReducer(reducer, {
    isModalOpen: false,
    giftList: [{ id: 1672082234700.3264, regalo: 'un regalo', para: 'tish', url: 'https://picsum.photos/seed/picsum/200/300', cantidad: '2' }],
    editMode: {
      isEditOn: false,
      giftToEdit: null,
    }
  });



  return (
    <div className="App">

      {
        state.isModalOpen ?

          <Form
            dispatch={dispatch}
            editMode={state.editMode} />

          : null
      }

      <main className='gift-list'>
        <h1>Regalos:</h1>

        <button
          type="button"
          onClick={() => dispatch({ type: ACTIONS.OPEN_MODAL })}>Agregar Regalo
        </button>

        <ul>
          {state.giftList.map(gift => (
            <li key={gift.id}>
              <img src={gift.url}></img>

              <div className='li-text'>
                <p>
                  {gift.cantidad < 2 ? gift.regalo : `${gift.regalo} x${gift.cantidad}`}
                </p>
                <p>{gift.para}</p>
              </div>
              <div className='li-button-wrapper'>

                <button
                  className='li-btn'
                  onClick={
                    () => dispatch({
                      type: ACTIONS.EDIT_ON,
                      payload: { gift },
                    })}
                > <Editsvg />
                </button>


                <button
                  className='li-btn'
                  onClick={() => dispatch({
                    type: ACTIONS.REMOVE_GIFT,
                    payload: {
                      id: gift.id
                    }
                  })}
                >X
                </button>
              </div>
            </li>
          ))}
        </ul>

      </main>
    </div>
  );
}

export default App;
