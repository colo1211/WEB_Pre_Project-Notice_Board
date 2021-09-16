export default function(state = {}, action) {

    switch(action.type){
        case 'LOGIN_ACTION':
            return {...state, user: action.payload}
            
        case 'REGISTER_ACTION':
            return {...state, user: action.payload}
        
        case 'LOGOUT_ACTION' : 
            return {...state, user:action.payload}
        
        default:
            return state; 
    }
}