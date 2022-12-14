
export const ACTIONS = {
    ADD_GIFT: "add",
    REMOVE_GIFT: "remove",
    CLEAR_LIST: "clear",
    ADD_COUNTER: "add_counter",
    MINUS_COUNTER: "minus_counter"
}

export function reducer(state, action) {


    switch (action.type) {
        case ACTIONS.ADD_GIFT:
            return { ...state, gifts: [...state.gifts, addGift(action.payload.gift)] };
        case ACTIONS.REMOVE_GIFT:
            return {
                ...state, gifts: state.gifts.filter((gift) => {
                    if (action.payload.id !== gift.id) {
                        return gift
                    }
                    return null
                })
            }
        case ACTIONS.CLEAR_LIST:
            return { ...state, gifts: [] };
        case ACTIONS.ADD_COUNTER:
            return { ...state, counter: state.counter + 1 };
        case ACTIONS.MINUS_COUNTER:
            return { ...state, counter: state.counter - 1 };
        default: return state;

    }
}

function addGift(gift) {
    return { id: Date.now(), name: gift }
}