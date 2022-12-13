import "./GiftList.css";
import { useReducer } from "react";
import { ACTIONS, reducer } from "../../utils/functions/reducer";

export default function GiftList() {

    const [gifts, dispatch] = useReducer(reducer, [{ name: "whats's up", id: 123 }]);

    function handleSubmit(e) {
        let isGiftsRepeated = false;
        const input = e.target.giftInput.value;
        e.preventDefault();
        if (input.trim() === "") return;

        /* check if gifts is already there */
        gifts.map(gift => {
            if (Object.values(gift).includes(e.target.giftInput.value)) {
                isGiftsRepeated = true
            }
        });

        if (isGiftsRepeated) return /* early return if gift is there */


        dispatch({ type: ACTIONS.ADD_GIFT, payload: { gift: e.target.giftInput.value } })
        e.target.giftInput.value = "";
    }

    return (
        <main className="list-wrapper">
            <h1>Regalos:</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <input type="text" id="giftInput" />
                    <button>Agregar</button>
                </div>

                <ul>
                    {gifts.map(
                        gift => (
                            <li key={`${gift.id} ${gift.name}`}>
                                <p>{gift.name}</p>

                                <button
                                    className="li-button"
                                    type="button"

                                    onClick={
                                        () => dispatch(
                                            { type: ACTIONS.REMOVE_GIFT, payload: { id: gift.id } }
                                        )}
                                >X</button>
                            </li>
                        )
                    )}
                </ul>

                {gifts.length < 1 ?
                    <p className="default-msg">Agrega regalos!</p> :

                    <button className="borrar-todo"
                        onClick={() => dispatch({ type: ACTIONS.CLEAR_ALL })}
                        type="button"
                    >Borrar todo</button>
                }
            </form>
        </main>
    );
}