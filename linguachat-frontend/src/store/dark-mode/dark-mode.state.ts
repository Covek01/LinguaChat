import { DarkMode } from "./dark-mode.types";


function retrieveState() {
    const ret = localStorage.getItem('darkMode')
    return ret
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