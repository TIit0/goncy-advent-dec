

export const ACTIONS = {
    ADD_GIFT: "add",
    REMOVE_GIFT: "remove",
    CLEAR_ALL: "clear"
}


export function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.ADD_GIFT:
            return [...state, newGift(action.payload.gift)];
        case ACTIONS.REMOVE_GIFT:
            return state.filter( gift => {
                if(gift.id !== action.payload.id) return gift;
            });
        case ACTIONS.CLEAR_ALL:
            return [];
    }
}

function newGift(name) {
    return { id: Date.now(), name}
}