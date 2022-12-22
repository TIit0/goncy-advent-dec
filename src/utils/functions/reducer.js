export const ACTIONS = {
    OPEN_MODAL: "open",
    CLOSE_MODAL: "close",
    ADD_GIFT: "add",
    EDIT_GIFT: "edit",
    REMOVE_GIFT: "remove",
    CLEAR: "clear",
    OPEN_EDIT: "edit open",
    CLOSE_EDIT: "edit close"
}

export function reducer(state, action) {

    switch (action.type) {
        case ACTIONS.OPEN_MODAL:
            return { ...state, isModalOpen: true };
        case ACTIONS.CLOSE_MODAL:
            return { ...state, isModalOpen: false };
        case ACTIONS.ADD_GIFT:
            return {
                ...state, giftList: [...state.giftList, addGift(
                    action.payload.gift.regalo,
                    action.payload.gift.para,
                    action.payload.gift.url,
                    action.payload.gift.cantidad
                )]
            };
        case ACTIONS.REMOVE_GIFT:
            return {
                ...state, giftList: state.giftList.filter(gift => {
                    if (action.payload.id !== gift.id) return gift;
                    return null;
                })
            };
        case ACTIONS.CLEAR:
            return {...state, giftList: []}
        case ACTIONS.OPEN_EDIT:
            console.log(action.payload.gift)
            return {
                ...state,
                isModalOpen: true,
                editMode: {
                    isActive: true,
                    giftToEdit: action.payload.gift,
                }
            };
        case ACTIONS.EDIT_GIFT:
            return {
                ...state,
                giftList: state.giftList.filter(gift => {
                    if (action.payload.id !== gift.id) {
                        return gift;
                    } else {
                        gift.id = action.payload.id
                        gift.regalo = action.payload.regalo
                        gift.para = action.payload.para
                        gift.url = action.payload.url
                        gift.cantidad = action.payload.cantidad
                    }
                })
            }
        case ACTIONS.CLOSE_EDIT:
            return {
                ...state,
                isModalOpen: false,
                editMode: {
                    isActive: false,
                    giftToEdit: null,
                }
            };
            default: 
            return state;
    }
}

function addGift(regalo, para, url, cantidad) {
    return {
        id: Date.now() + Math.random(),
        regalo,
        para,
        url,
        cantidad
    }
}