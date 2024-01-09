import { getItem, setItem } from "../../common/cookie.service.js";

const state = {
    darkMode: undefined
};

const getters = {
    darkMode: (state) => state.darkMode ? state.darkMode : getItem('darkMode'),
};

const mutations = {
    setDarkMode: (state, darkMode ) => {
      state.darkMode = darkMode
      setItem("darkMode", state.darkMode);
    },
};

export default {
    state,
    getters,
    mutations,
};