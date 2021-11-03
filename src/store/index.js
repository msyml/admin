import { createStore } from "vuex";

export const store =  createStore({
    state: {
        count: 0,
        sidebar: false,
        categoryList: []
    },
    getters: {
        getSidebar:state => {
            return state.sidebar;
        },
        getCategoryList:state => {
            return state.categoryList;
        }
    },
    mutations: {
        TOGGLE_SIDEBAR(state){
            state.sidebar = !state.sidebar;
        },
        CLOSE_SIDEBAR(state) {
            state.sidebar = false;
        },
        SET_CATEGORY_LIST(state, list) {
            state.categoryList = list;
        }
    },
    actions: {
        toggleSideBar(context){
            context.commit("TOGGLE_SIDEBAR")
        },
        closeSideBar(){
            context.commit("CLOSE_SIDEBAR")
        }
    }
})