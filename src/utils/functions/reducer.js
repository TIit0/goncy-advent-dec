
export const ACTIONS = {
    ADD_GIFT: "add",
    REMOVE_GIFT: "remove",
    CLEAR_LIST: "clear",
    INCREMENT_COUNTER: "increment",
    DECREMENT_COUNTER:  "decrement"
}

export function reducer(state, action) {

    switch(action.type) {
        case ACTIONS.ADD_GIFT:
            return {...state, gifts: [...state.gifts, addGift(action.payload.gift)]};
        case ACTIONS.REMOVE_GIFT:
            return {...state, gifts: state.gifts.filter( gift => {
                if (action.payload.giftId !== gift.id ) {
                    return gift;
                }
                return null;
            })};
        case ACTIONS.CLEAR_LIST:
            return {...state, gifts: []}
        case ACTIONS.INCREMENT_COUNTER:
            return {...state, counter: state.counter + 1};
        case ACTIONS.DECREMENT_COUNTER:
            return {...state, counter: state.counter - 1};
        default: return state;
    }
}

function addGift(gift) {
    return {id: `${Date.now()}` + `${ Math.random()}`, name: gift}
}