// 초기 user 값
let userInfo = {
    isLogin : false, 
    name : null, 
    id : null, 
    accessToken : null, 
    accessTokenExpiredAt : null
};

export default function(state = userInfo, action) {

    switch(action.type){
        case 'LOGIN_ACTION':
            state.isLogin = true;
            state.name = action.payload.name;
            state.id = action.payload.id; 
            state.accessToken = action.payload.accessToken;
            state.accessTokenExpiredAt = action.payload.accessTokenExpiredAt;
            return {...state, user: state}
        
        case 'REGISTER_ACTION':
            return {...state, user: action.payload}
        
        case 'LOGOUT_ACTION' : 
            state.isLogin = false;
            state.name = null;
            state.id = null; 
            state.accessToken = null;
            state.accessTokenExpiredAt = null;
            return {...state, user:state}        
        default:
            return state; 
    }
}