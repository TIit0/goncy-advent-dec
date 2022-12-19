
export const ACTIONS = {
    ADD_GIFT: "agregar",
    REMOVE_GIFT: "remove",
    CLEAR_LIST: "clear",
    SET_QUANTITY: "quantity",
    OPEN_MODAL: "open",
    CLOSE_MODAL: "close"
}

export function reducer(state, action) {

    switch (action.type) {
        case ACTIONS.OPEN_MODAL:
            return { ...state, isModalOpen: true };
        case ACTIONS.CLOSE_MODAL:
            return { ...state, isModalOpen: false };
        case ACTIONS.ADD_GIFT:
            console.log(action)
            return {
                ...state, gifts: [...state.gifts,
                addGift(action.payload.gift,
                    action.payload.quantity,
                    action.payload.url)]
            };
        case ACTIONS.REMOVE_GIFT:
            return {...state, gifts: state.gifts.filter( gift => {
                if(gift.id !== action.payload.id) return gift;

                return null;
            })};
        case ACTIONS.CLEAR_LIST:
            return {...state, gifts: []};
            default:
                return state;
    }
}

function addGift(gift, quantity, url) {
    return {
        id: Date.now() + Math.random(),
        name: quantity > 1 ? `${gift} x${quantity}` : gift,
        url: url,
    }
}