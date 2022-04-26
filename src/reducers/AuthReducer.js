export const initialState = {
   isAuthenticated: false,
   user: "",
};

export const AuthReducer = (state, action) => {
   const { type, payload } = action;
   switch (type) {
      case "LOGIN_SUCCESS":
         localStorage.setItem("user", JSON.stringify(payload.user));
         return {
            ...state,
            isAuthenticated: true,
            user: payload.user,
         };
      case "LOGOUT":
         localStorage.clear();
         return {
            ...state,
            isAuthenticated: false,
            user: null,
         };
      default:
         return initialState;
   }
};
