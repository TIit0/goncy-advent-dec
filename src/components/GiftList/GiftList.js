import "./GiftList.css"
import { ACTIONS, reducer } from "../../utils/functions/reducer"
import socks from "../../utils/imgs/socks.jpg"
import { useReducer, useEffect } from "react";

export default function GiftList() {

    function lazyInit() {
        return {gifts: JSON.parse(window.localStorage.getItem("GiftList")) || [], counter: 0, link: ""}
    }

    const [state, dispatch] = useReducer(reducer, { gifts: [] , counter: 0, link: "", }, lazyInit)

    useEffect(() => {
        window.localStorage.setItem("GiftList", JSON.stringify(state.gifts))
    }, [state.gifts])

    function handleSubmit(e) {
        e.preventDefault();
        const input = e.target.textField.value;
        const link = e.target.urlField.value;
        if (input.trim() === "" || link.trim() === "") return;

        dispatch({ type: ACTIONS.ADD_GIFT, payload: { gift: input, count: state.counter, url: link} });
        e.target.textField.value = "";
        e.target.urlField.value = "";

        console.log(input, link)
    }

    console.log(state)
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" id="textField" placeholder="regalo" required />
                <input type="text" id="urlField" placeholder="url" required />
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
                        <img src={`${gift.link ? gift.link : socks}`} ></img>
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