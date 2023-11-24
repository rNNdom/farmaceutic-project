import { atom } from "jotai";

const localStorageToken = sessionStorage.getItem("@token");
const boolean = localStorageToken ? true : false;

export const isLogged = atom(boolean);
export const isAdmin = atom(false);
