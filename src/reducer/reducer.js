let InitialState = {
    ids: []
};
export const Reducer = (state = InitialState, action) => {
   
    switch (action.type) {
       
        case 'user':
            console.log('user', action);
            return {
                ...state,
                ids: action.ids,
            };

        default:
            return state;
    }
};

