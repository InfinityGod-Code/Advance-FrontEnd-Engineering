import {configureStore} from "@reduxjs/toolkit";    
import dashboardReducer from "./dashboard/state/reducer";

const store = configureStore({
    reducer: {
        dashboard: dashboardReducer
    },
});

export default store;