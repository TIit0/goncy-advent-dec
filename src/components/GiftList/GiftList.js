import "./GiftList.css"
import { useReducer } from "react";
import { ACTIONS, reducer } from "../../utils/functions/reducer"

export default function GiftList() {

    const [state, dispatch] = useReducer(reducer, { gifts: [], counter: 0 });

    console.log(state.gifts, state.counter)
    function handleSubmit(e) {
        e.preventDefault();
        const input = e.target.giftInput.value;
        if (input.trim() === "") return;

        dispatch({ type: ACTIONS.ADD_GIFT, payload: { gift: input } });

        e.target.giftInput.value = "";
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <input type="text" id="giftInput" />
                    <div className="display-wrapper">
                        <p className="counter-display">{state.counter}</p>
                        <div className="button-container">

                            <button
                            className="counter-button"
                            type="button"
                            onClick={(() => dispatch({type: ACTIONS.ADD_COUNTER}))}
                            >+</button>

                            <button
                            className="counter-button"
                            type="button"
                            onClick={(() => dispatch({type: ACTIONS.MINUS_COUNTER}))}
                            >-</button>
                        </div>
                    </div>
                    <button>Agregar</button>
                </div>
            </form>
            <ul>
                {state.gifts.map(gift => (
                    <li key={gift.id}>
                        <p>{gift.name}</p>
                        <button
                            type="button"
                            className="li-button"
                            onClick={
                                () => dispatch({
                                    type: ACTIONS.REMOVE_GIFT,
                                    payload: { id: gift.id }
                                })}
                        >X</button>
                    </li>
                ))}
            </ul>
            {state.gifts.length < 1 ?
                <p className="default-text">Agrega regalos!</p> :
                <button
                    className="borrar-todo"
                    type="button"
                    onClick={() => dispatch({ type: ACTIONS.CLEAR_LIST })}
                >Borrar todo</button>
            }
        </>

    );
}