import "./Form.css";
import { ACTIONS } from "../../utils/functions/reducer";

export default function Form({state, dispatch}) {

function handleSubmit(e) {
    const giftInput = e.target.inputGift.value;
    const urlInput = e.target.inputUrl.value;
    const quantityInput = parseInt(e.target.inputQuantity.value);

    e.preventDefault();
    if(isNaN(quantityInput)) return;
    if (giftInput.trim() === "" || urlInput.trim() === "") return;

    dispatch({type: ACTIONS.ADD_GIFT, payload: {gift: giftInput, quantity: quantityInput, url: urlInput }})

    e.target.inputGift.value = "";
    e.target.inputUrl.value = "";
    e.target.inputQuantity.value = "";
}

    return (
        <div className="fade">

            <form onSubmit={handleSubmit}>
                <label htmlFor="inputGift">Regalo:</label>
                <input type="text" id="inputGift" required></input>
                <label htmlFor="inputUrl">Url Imagen:</label>
                <input type="text" id="inputUrl"></input>
                <label htmlFor="inputQuantity">Cantidad:</label>
                <input type="text" id="inputQuantity"></input>
                <div className="button-wrapper">
                    <button
                    type="button"
                    className="form-btn"
                    onClick={() => {dispatch({type: ACTIONS.CLOSE_MODAL})}}>Cerrar
                    </button>
                    
                    <button className="form-btn">Agregar</button>
                </div>
            </form>
        </div>
    );
}