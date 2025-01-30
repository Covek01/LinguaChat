import { CookieService } from "ngx-cookie-service";
import { DarkMode } from "./dark-mode.types";
import { Injector } from "@angular/core";

const injector = Injector.create({
    providers: [
        {
            provide: CookieService,
            useClass: CookieService,
            deps: []
        }
    ]
});
const cookieService =  injector.get(CookieService);

function retrieveState() {
    const retrievedValue = localStorage.getItem('darkMode')
    //const retrievedValue = cookieService.get('darkMode');
    return retrievedValue;
}

const defaultInitialStateDarkMode: DarkMode = {
    isDark: false
}

function getCurrentDarkModeState() {
    if (retrieveState()) {
        const newState = JSON.parse(retrieveState() ?? '')   
        console.log(newState);

        return {
            isDark: newState
        };
    }
    else {
        console.log(defaultInitialStateDarkMode);       
        return defaultInitialStateDarkMode;
    }
}

export const initialStateDarkMode = getCurrentDarkModeState()