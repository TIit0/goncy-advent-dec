export const ACTIONS = {
    OPEN_MODAL: "open",
    CLOSE_MODAL: "close",
    ADD_GIFT: "add",
    REMOVE_GIFT: "remove",
    EDIT_GIFT: "edit",
    EDIT_ON: "on",
    EDIT_OFF: "off",
    CLEAR_LIST: "clear"
}

export function reducer(state, action) {
    switch (action.type) {

        case ACTIONS.OPEN_MODAL:
            return { ...state, isModalOpen: true };
        case ACTIONS.CLOSE_MODAL:
            return { ...state, isModalOpen: false };
        case ACTIONS.ADD_GIFT:
            return {
                ...state, giftList: [...state.giftList,
                addGift(
                    action.payload.gift.regalo,
                    action.payload.gift.para,
                    action.payload.gift.url,
                    action.payload.gift.cantidad
                )
                ]
            };
        case ACTIONS.REMOVE_GIFT:
            return {
                ...state, giftList:
                    state.giftList.filter(
                        gift => {
                            if (gift.id !== action.payload.id) return gift;

                            return null;
                        })
            };
        case ACTIONS.EDIT_GIFT:
            return {
                ...state, giftList:
                    state.giftList.map(gift => {
                        if (gift.id !== action.payload.giftToEdit.id) {
                            return gift;
                        } else {
                            return {
                                id: action.payload.giftToEdit.id,
                                regalo: action.payload.giftToEdit.regalo,
                                para: action.payload.giftToEdit.para,
                                url: action.payload.giftToEdit.url,
                                cantidad: action.payload.giftToEdit.cantidad,
                            }
                        }
                    })
            };
        case ACTIONS.EDIT_ON:
            return {
                ...state, isModalOpen: true,
                editMode: {
                    isEditOn: true,
                    giftToEdit: action.payload.gift,
                }
            };
        case ACTIONS.EDIT_OFF:
            return {
                ...state, isModalOpen: false,
                editMode: {
                    isEditOn: false,
                    giftToEdit: null,
                }
            };
        case ACTIONS.CLEAR_LIST:
            return {...state, giftList: []}
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