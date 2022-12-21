
export const ACTIONS = {
    OPEN_MODAL: "open",
    CLOSE_MODAL: "close",
    ADD_GIFT: "add",
    REMOVE_GIFT: "remove",
    CLEAR_LIST: "clear"
}

export function reducer(state, action) {

    switch (action.type) {
        case ACTIONS.OPEN_MODAL:
            return { ...state, isModalOpen: true };
        case ACTIONS.CLOSE_MODAL:
            return { ...state, isModalOpen: false };
        case ACTIONS.ADD_GIFT:
        return {...state, gifts: [...state.gifts, addGift(
            action.payload.regalo,
            action.payload.para,
            action.payload.url,
            action.payload.cantidad)
        ]};
        case ACTIONS.REMOVE_GIFT:
            return {...state, gifts: state.gifts.filter(gift => {
                if (gift.id !== action.payload.id) return gift;
                return null;
            })};
        case ACTIONS.CLEAR_LIST:
            return {...state, gifts: []};

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