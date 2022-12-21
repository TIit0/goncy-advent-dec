
export const ACTIONS = {
    OPEN_MODAL: "open",
    CLOSE_MODAL: "close",
    ADD_GIFT: "add",
    REMOVE_GIFT: "remove",
    CLEAR_LIST: "clear",
    EDIT_GIFT: "edit",
    UPDATE_EDITED_GIFT: "update",
    CLEAR_EDIT: "stop editing"
}

export function reducer(state, action) {

    switch (action.type) {
        case ACTIONS.OPEN_MODAL:
            return { ...state, isModalOpen: true };
        case ACTIONS.CLOSE_MODAL:
            return { ...state, isModalOpen: false };
        case ACTIONS.ADD_GIFT:
            return {
                ...state, gifts: [...state.gifts, addGift(
                    action.payload.regalo,
                    action.payload.para,
                    action.payload.url,
                    action.payload.cantidad)
                ]
            };
        case ACTIONS.REMOVE_GIFT:
            return {
                ...state, gifts: state.gifts.filter(gift => {
                    if (gift.id !== action.payload.id) return gift;
                    return null;
                })
            };
        case ACTIONS.EDIT_GIFT:
            return { ...state, isModalOpen: true, edit: action.payload };
        case ACTIONS.CLEAR_EDIT:
            return { ...state, isModalOpen: false, edit: action.payload }
        case ACTIONS.UPDATE_EDITED_GIFT:
            console.log(action.payload)
            return {
                ...state, gifts: state.gifts.map(gift => {
                    if (gift.id !== action.payload.id) {
                    return gift
                } else {
                    return {id: action.payload.id,
                        regalo: action.payload.gift.regalo,
                        para: action.payload.gift.para,
                        url: action.payload.gift.url,
                        cantidad: action.payload.gift.cantidad
                    }
                }
                }), edit: { isEditOn: false, gift: false }, isModalOpen: false
            };
        case ACTIONS.CLEAR_LIST:
            return { ...state, gifts: [] };
    }
}

function addGift(regalo, para, url, cantidad) {
    return {
        id: Date.now() + Math.random(),
        regalo: cantidad > 1 ? `${regalo} x${cantidad}` : regalo,
        para,
        url,
    }
}