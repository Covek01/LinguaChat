import { StoreModule } from "@ngrx/store";
import { darkModeReducer } from "../dark-mode/dark-mode.reducer";
import { loginReducer } from "../login/login.reducer";
import { signupReducer } from "../signup/signup.reducer";
import { myUserStateReducer, userStateReducer } from "../user/user-data/user-data.reducer";
import { blockedUsersReducer } from "../user/blocked-users/blocked-users.reducer";


//it's stateName - reducer configuration
export const ngStoreNames = StoreModule.forRoot({ 
    darkMode: darkModeReducer, 
    loginState: loginReducer,
    signupState: signupReducer,
    userState: userStateReducer,
    myUserState: myUserStateReducer,
    blockedUsers: blockedUsersReducer
})

