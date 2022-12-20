import "./Form.css"
import ReactDom from "react-dom";
import { ACTIONS } from "../../utils/functions/reducer";

export default function Form({ isModalOpen, dispatch }) {
    if (!isModalOpen) return null;

    function handleSubmit(e) {
        e.preventDefault();
        const inputRegalo = e.target.regalo.value;
        const inputUrl = e.target.url.value;
        let inputCantidad = parseInt(e.target.cantidad.value);
        const inputPara = e.target.para.value;

        if (inputRegalo.trim() === "" || 
        inputUrl.trim() === "" || 
        inputPara.trim() === "") return;

        if (isNaN(inputCantidad)) inputCantidad = 0;

        dispatch({
            type: ACTIONS.ADD_GIFT,
            payload: {
                gift: inputRegalo,
                quantity: inputCantidad,
                url: inputUrl,
                forWho: inputPara,
            }
        })

        e.target.regalo.value = "";
        e.target.url.value = "";
        e.target.cantidad.value = "";
        e.target.para.value = "";
    }

    return ReactDom.createPortal(
        <>
            <div className="modal"
                onClick={() => dispatch({ type: ACTIONS.CLOSE_MODAL })} />

            <form onSubmit={handleSubmit}>
                <label>Regalo:</label>
                <input type="text" id="regalo" required></input>
                <label>Url imagen:</label>
                <input type="text" id="url" required></input>
                <label>Cantidad:</label>
                <input type="text" id="cantidad"></input>
                <label>Para:</label>
                <input type="text" id="para" required></input>

                <div className="button-wrapper">
                    <button
                        className="form-btn"
                        onClick={() => dispatch({ type: ACTIONS.CLOSE_MODAL })}
                        type="button"
                    >Cerrar
                    </button>

                    <button className="form-btn">Agregar</button>
                </div>
            </form>
        </>,
        document.getElementById("portal")
    );
}