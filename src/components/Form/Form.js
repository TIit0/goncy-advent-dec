import "./Form.css"
import { ACTIONS } from "../../utils/functions/reducer";
import ReactDOM from "react-dom";

export default function Form({ dispatch, edit }) {

    const editing = edit.gift ? true : false;
    console.log(editing)

    function handleSubmit(e) {
        const regalo = e.target.regalo.value;
        const para = e.target.para.value;
        const url = e.target.url.value;
        let cantidad = parseInt(e.target.cantidad.value);
        e.preventDefault();
        if(isNaN(cantidad)) cantidad = 1;
        if (regalo.trim() === "" || para.trim() === "" || url.trim() === "") return;

        console.log(regalo, para, url, cantidad)

        if (edit.isEditOn) {
            return dispatch({
                type: ACTIONS.UPDATE_EDITED_GIFT,
                payload: {
                    gift: {
                        regalo,
                        para,
                        url,
                        cantidad
                    },
                    id: edit.gift.id
                }
            })
        }

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
                onClick={() => {
                    if (!edit.isEditOn) {
                        dispatch({ type: ACTIONS.CLOSE_MODAL })
                    } else if (edit.isEditOn) { 
                        dispatch({
                            type: ACTIONS.CLEAR_EDIT, payload: {
                                isEditOn: false,
                                gift: undefined
                            }
                        })
                    }
                }} />

            <form onSubmit={handleSubmit}>
                <label htmlFor="regalo">Regalo:</label>
                <input type="text" id="regalo"
                    defaultValue={editing ? edit.gift.regalo : ""}></input>
                <label htmlFor="para">Para:</label>
                <input type="text" id="para"
                    defaultValue={editing ? edit.gift.para : ""}></input>
                <label htmlFor="url">Url imagen:</label>
                <input type="text" id="url"
                    defaultValue={editing ? edit.gift.url : ""}></input>
                <label htmlFor="cantidad">Cantidad:</label>
                <input type="text" id="cantidad"
                    defaultValue={editing ? edit.gift.cantidad : ""}></input>

                <div className="form-button-container">

                    <button
                        className="form-button"
                        type="button"
                        onClick={() => {
                            if (!edit.isEditOn) {
                                dispatch({ type: ACTIONS.CLOSE_MODAL })
                            } else if (edit.isEditOn) { 
                                dispatch({
                                    type: ACTIONS.CLEAR_EDIT, payload: {
                                        isEditOn: false,
                                        gift: undefined
                                    }
                                })
                            }
                        }}>Cerrar
                    </button>

                    <button className="form-button">
                        {edit.isEditOn ? "Guardar" : "Agregar"}
                    </button>
                </div>
            </form>
        </>,
        document.getElementById("modal")
    );
}