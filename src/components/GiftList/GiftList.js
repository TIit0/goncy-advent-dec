import "./GiftList.css"
import { useReducer, useEffect } from "react";
import { ACTIONS, reducer } from "../../utils/functions/reducer"

export default function GiftList() {


    
    const [state, dispatch] = useReducer(reducer, { gifts: JSON.parse(window.localStorage.getItem("listOfGifts")) || [], counter: 0 });

    useEffect( () => {
        window.localStorage.setItem("listOfGifts", JSON.stringify(state.gifts))
    }, [state.gifts] )

    function handleSubmit(e) {
        e.preventDefault();
        const input = e.target.textField.value;
        if (input.trim() === "") return;
        if (state.counter > 1) {
            for (let i = 1; i < state.counter; i++) {
                dispatch({ type: ACTIONS.ADD_GIFT, payload: { gift: input } })
            }
        }
        dispatch({ type: ACTIONS.ADD_GIFT, payload: { gift: input } });


        e.target.textField.value = "";
    }
    console.log(state.gifts)
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" id="textField" />
                <div className="counter">
                    <p className="counter-display">{state.counter}</p>

                    <div className="button-container">
                        <button
                            type="button"
                            className="button-operator"
                            onClick={() => dispatch({ type: ACTIONS.INCREMENT_COUNTER })}
                        >+</button>

                        <button
                            type="button"
                            className="button-operator"
                            onClick={() => {
                                if (state.counter < 1) return;
                                dispatch({ type: ACTIONS.DECREMENT_COUNTER })
                            }}
                        >-</button>
                    </div>
                </div>
                <button>Agregar</button>
            </form>
            <ul>
                {state.gifts.map(gift => (
                    <li key={gift.id}>
                        <p>{gift.name}</p>
                        <button
                            type="button"
                            className="remove-button"
                            onClick={() => dispatch(
                                { type: ACTIONS.REMOVE_GIFT, payload: { giftId: gift.id } }
                            )}
                        >X</button>
                    </li>
                ))}
            </ul>
            {state.gifts.length > 0 ?
                <button type="button"
                    className="clear-button"
                    onClick={() => { dispatch({ type: ACTIONS.CLEAR_LIST }) }}
                >Borrar todo</button> :
                <p className="default-text">Agrega Regalos!</p>}
        </>
    );
}