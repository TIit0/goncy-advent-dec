import "./Form.css";
import ReactDom from "react-dom";
import { ACTIONS } from "../../utils/functions/reducer";

export default function Form({ dispatch, editMode }) {

    const isEditOn = editMode.isEditOn ? true : "";
    const giftToEdit = editMode.giftToEdit;


    function handleSubmit(e) {
        const regalo = e.target.regalo.value;
        const para = e.target.para.value;
        const url = e.target.url.value;
        let cantidad = e.target.cantidad.value;
        e.preventDefault();

        if (regalo.trim() === "" || para.trim() === "" || url.trim() === "") return;

        if (isNaN(cantidad)) cantidad = 1;

        if (isEditOn) {
            return dispatch({
                type: ACTIONS.EDIT_GIFT,
                payload: {
                    giftToEdit: {
                        id: giftToEdit.id,
                        regalo,
                        para,
                        url,
                        cantidad
                    }
                }
            })
        };


        dispatch({
            type: ACTIONS.ADD_GIFT, payload: {
                gift: {
                    regalo,
                    para,
                    url,
                    cantidad
                }
            }
        })
    }

    return ReactDom.createPortal(
        <>
            <div className="modal"
                onClick={
                    () => {
                        if (isEditOn) {
                            return dispatch({ type: ACTIONS.EDIT_OFF })
                        } else {
                            dispatch({ type: ACTIONS.CLOSE_MODAL })
                        }
                    }
                } />


            <form onSubmit={handleSubmit}>
                <label htmlFor="regalo">Regalo:</label>
                <input
                    defaultValue={isEditOn ? giftToEdit.regalo : ""}
                    type="text"
                    id="regalo" />

                <label htmlFor="para">Para:</label>
                <input
                    defaultValue={isEditOn ? giftToEdit.para : ""}
                    type="text"
                    id="para" />

                <label htmlFor="url">Url Imagen:</label>
                <input
                    defaultValue={isEditOn ? giftToEdit.url : ""}
                    type="text"
                    id="url" />

                <label htmlFor="cantidad">cantidad:</label>
                <input
                    defaultValue={isEditOn ? giftToEdit.cantidad : ""}
                    type="text"
                    id="cantidad" />


                <div className="button-wrapper">

                    <button
                        type="button"
                        className="form-btn"
                        onClick={
                            () => {
                                if (isEditOn) {
                                    return dispatch({ type: ACTIONS.EDIT_OFF })
                                } else {
                                    dispatch({ type: ACTIONS.CLOSE_MODAL })
                                }
                            }
                        }
                    >Cerrar
                    </button>


                    <button
                        className="form-btn"
                    >{isEditOn ? "Guardar" : "Agregar"}
                    </button>
                </div>
            </form>
        </>,
        document.getElementById("modal")
    );
}