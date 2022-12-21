import "./Form.css"
import { ACTIONS } from "../../utils/functions/reducer";
import ReactDOM from "react-dom";

export default function Form({ dispatch }) {

    function handleSubmit(e) {
        const regalo = e.target.regalo.value;
        const para = e.target.para.value;
        const url = e.target.url.value;
        const cantidad = e.target.cantidad.value;
        e.preventDefault();

        if (regalo.trim() === "" || para.trim() === "" || url.trim() === "") return;

        console.log(regalo, para, url, cantidad)

        dispatch({
            type: ACTIONS.ADD_GIFT, payload: {
                regalo,
                para,
                url,
                cantidad
            }
        })
    }

    return ReactDOM.createPortal(
        <>
            <div
                className="modal"
                onClick={() => dispatch({ type: ACTIONS.CLOSE_MODAL })} />

            <form onSubmit={handleSubmit}>
                <label htmlFor="regalo">Regalo:</label>
                <input type="text" id="regalo"></input>
                <label htmlFor="para">Para:</label>
                <input type="text" id="para"></input>
                <label htmlFor="url">Url:</label>
                <input type="text" id="url"></input>
                <label htmlFor="cantidad">Cantidad:</label>
                <input type="text" id="cantidad"></input>

                <div className="form-button-container">

                    <button
                        className="form-button"
                        type="button"
                        onClick={() => dispatch({ type: ACTIONS.CLOSE_MODAL })}>Cerrar
                    </button>

                    <button className="form-button">Agregar</button>
                </div>
            </form>
        </>,
        document.getElementById("modal")
    );
}