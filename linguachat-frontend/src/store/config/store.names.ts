import { StoreModule } from "@ngrx/store";
import { darkModeReducer } from "../dark-mode/dark-mode.reducer";
import { loginReducer } from "../login/login.reducer";



export const ngStoreNames = StoreModule.forRoot({ 
    darkMode: darkModeReducer,  //states
    loginState: loginReducer
})

