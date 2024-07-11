/*import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../slices/employeesSlice";

const store = configureStore({
	reducer: {
		employees: employeesReducer,
	},
});

export default store;*/
/*
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import persistConfig from "./persistConfig";
import employeesReducer from "../slices/employeesSlice";


const persistedReducer = persistReducer(persistConfig, employeesReducer);

export const store = configureStore({
	reducer: persistedReducer,
	// Ajoutez d'autres options de configuration de Redux Toolkit au besoin
});

export const persistor = persistStore(store);
*/

// store.js

import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../slices/employeesSlice";
//import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default: localStorage for web

import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";

//import { employeesSlice } from "../slices/employeesSlice";

const persistConfig = {
	key: "root",
	//key: "employees",
	storage,
	//whitelist: ["employees"],
};

const persistedReducer = persistReducer(persistConfig, employeesReducer);
//const persistedReducer = persistReducer(persistConfig, employeesSlice.reducer);

export const store = configureStore({
	//reducer: persistedReducer,
	reducer: {
		employees: persistedReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
				//ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

//export { store, persistor };

/*
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { employeesSlice } from "../slices/employeesSlice";
import { configureStore } from "@reduxjs/toolkit";

const employeesConfig = {
	key: "employees",
	version: 1,
	storage,
};

const persistedReducer = persistReducer(employeesConfig, employeesSlice.reducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});
export const persistor = persistStore(store);
*/
