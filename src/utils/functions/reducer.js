
export const ACTIONS = {
    ADD_GIFT: "add",
    REMOVE_GIFT: "remove",
    CLEAR_LIST: "clear",
    INCREASE: "increase",
    DECREASE: "decrease"
}

export function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.INCREASE:
            return { ...state, counter: state.counter + 1 };
        case ACTIONS.DECREASE:
            return { ...state, counter: state.counter - 1 };
        case ACTIONS.ADD_GIFT:
            return {
                ...state,
                gifts: [...state.gifts, addGift(action.payload.gift, action.payload.count)]
            };
        case ACTIONS.REMOVE_GIFT:
            return {...state, gifts: state.gifts.filter( gift => {
                if (gift.id !== action.payload.id) return gift;
                return null;
            })};
        case ACTIONS.CLEAR_LIST:
            return {...state, gifts: []}

    }
}

function addGift(gift, howMany) {
    return { id: Date.now() + Math.random(), name: howMany > 1 ? `${gift} x${howMany}` : gift }
}