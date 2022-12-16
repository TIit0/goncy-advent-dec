import "./GiftList.css"
import { ACTIONS, reducer } from "../../utils/functions/reducer"
import { useReducer } from "react";

export default function GiftList() {

    function lazyInit() {

    }

    const [state, dispatch] = useReducer(reducer, { gifts: [{ id: 1671227433077.1428, name: 'wazza x4' }], counter: 0 })

    function handleSubmit(e) {
        e.preventDefault();
        const input = e.target.textField.value;
        if (input.trim() === "") return;

        dispatch({ type: ACTIONS.ADD_GIFT, payload: { gift: input, count: state.counter } });
        e.target.textField.value = "";

        console.log(input)
    }

    console.log(state)
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" id="textField" />
                <div className="counter">
                    <p className="counter-display">{state.counter}</p>
                    <div className="btn-container">

                        <button
                            className="operator-btn"
                            type="button"
                            onClick={() => { dispatch({ type: ACTIONS.INCREASE }) }}>+</button>

                        <button
                            className="operator-btn"
                            type="button"
                            onClick={() => {
                                if (state.counter < 1) return;
                                dispatch({ type: ACTIONS.DECREASE })
                            }}>-</button>

                    </div>
                </div>
                <button>Agregar</button>
            </form>
            <ul>
                {state.gifts.map(gift => (
                    <li key={gift.id}>
                        <img></img>
                        <p>{gift.name}</p>

                        <button
                            className="li-button"
                            onClick={() =>
                                dispatch({ type: ACTIONS.REMOVE_GIFT, payload: { id: gift.id } })}>X
                        </button>
                    </li>
                ))}
            </ul>
            {state.gifts.length > 0 ? 
            <button 
            className="borrar-todo"
            onClick={() => dispatch({type: ACTIONS.CLEAR_LIST})}
            >Borrar Todo</button> : 
            <p className="default-text">Agrega Regalos!</p>}
        </>
    );
}