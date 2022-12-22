import "./Form.css";
import ReactDOM from "react-dom";
import { ACTIONS } from "../../utils/functions/reducer";

export default function Form({ dispatch, editMode }) {

    const isEditing = editMode.isActive ? true : false;
    const giftToEdit = editMode.giftToEdit;
    

    function handleSubmit(e) {
        e.preventDefault();
        const regalo = e.target.regalo.value;
        const para = e.target.para.value;
        const url = e.target.url.value;
        let cantidad = e.target.cantidad.value;

        if (regalo.trim() === "" || para.trim() === "" || url.trim() === "") return;
        if (cantidad < 2) cantidad = 1;


        if(isEditing) {
            dispatch({
                type: ACTIONS.EDIT_GIFT,
                payload: {
                    id: giftToEdit.id,
                    regalo,
                    para,
                    url,
                    cantidad
                }
            })
        }

        dispatch({
            type: ACTIONS.ADD_GIFT,
            payload: { gift: { regalo, para, url, cantidad } }
        })
        console.log(regalo, para, url, cantidad)
    }

    return ReactDOM.createPortal(
        <>
            <div className="modal"
                onClick={() => {
                    if(isEditing) {
                        dispatch({type: ACTIONS.CLOSE_EDIT})
                    } else {
                        dispatch({ type: ACTIONS.CLOSE_MODAL })
                    }
                }} />


            <form onSubmit={handleSubmit}>
                <label htmlFor="regalo">Regalo:</label>
                <input type="text" id="regalo"
                defaultValue={isEditing ? giftToEdit.regalo : ""} />
                <label htmlFor="para">Para:</label>
                <input type="text" id="para"
                defaultValue={isEditing ? giftToEdit.para : ""} />
                <label htmlFor="url">Url Imagen:</label>
                <input type="text" id="url"
                defaultValue={isEditing ? giftToEdit.url : ""} />
                <label htmlFor="cantidad">cantidad:</label>
                <input type="text" id="cantidad"
                defaultValue={isEditing ? giftToEdit.cantidad : ""} />

                <div className="button-wrapper">

                    <button
                        className="form-btn"
                        type="button"
                        onClick={() => {
                            if(isEditing) {
                                dispatch({type: ACTIONS.CLOSE_EDIT})
                            } else {
                                dispatch({ type: ACTIONS.CLOSE_MODAL })
                            }
                        }}
                    >Cerrar
                    </button>

                    <button className="form-btn">{isEditing ? "Guardar" :"Agregar"}</button>

                </div>
            </form>
        </>,
        document.getElementById("modal")
    );
}