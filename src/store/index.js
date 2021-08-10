import Vue from 'vue';
import Vuex from 'vuex';
import { TriviaAPI } from "@/components/Screens/trivia/TriviaAPI";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        triviaQuestions: [],
        answers: [],
        name: "",
        difficulty: "",
        category: "",
        numberOfQuestions: 0,
        categories: []
    },
    mutations: {
        setTriviaQuestions: (state, payload) => {
            state.triviaQuestions = payload;
        },
        setCategories: (state, payload) => {
            state.categories = payload;
        },
        setCategory: (state, payload) => {
            state.category = payload;
        },
        addAnswer: (state, payload) => {
            state.answers.push(payload);
        },
        emptyAnswers: (state) => {
            state.answers = [];
        }, 
        setName: (state, payload) => {
            state.name = payload;
        },
        setDifficulty: (state, payload) => {
            state.difficulty = payload;
        },
        setNumberOfQuestions: (state, payload) => {
            state.numberOfQuestions = payload;
        }
    },
    getters: {
        getCategories: state => {
            return state.categories;
        },
        getPoints: state => {
            return [...state.answers.filter(x => x === true)].length * 10;
        }
    },
    actions: {
        async fetchCategories({ commit }) {
            try {
                const categories = await TriviaAPI.fetchCategories();
                commit("setCategories", categories)
            } catch (error) {
                commit("setError", error.message);
            }
        }
    }
})