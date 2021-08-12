import Vue from 'vue';
import Vuex from 'vuex';
import { TriviaAPI } from "@/api/trivia/TriviaAPI";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        triviaQuestions: [],
        answers: [],
        userName: "",
        difficulty: "",
        category: "",
        numberOfQuestions: 0,
        categories: [],
        headerText: ""
    },
    mutations: {
        setTriviaQuestions: (state, payload) => {
            state.triviaQuestions = payload;
        },
        setHeaderText: (state, payload) => {
            state.headerText = payload;
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
            state.userName = payload;
        },
        setDifficulty: (state, payload) => {
            state.difficulty = payload;
        },
        setNumberOfQuestions: (state, payload) => {
            state.numberOfQuestions = payload;
        },
        resetStore: (state) => {
            state.category = -1;
            state.numberOfQuestions = 0;
            state.difficulty = "";
            state.userName = "";
        }
    },
    getters: {
        isAnswerCorrect: (state, index) => {
            return state.answers[index] === state.triviaQuestions[index].correct_answer;
        },
        getPoints: state => {
            return state.answers.reduce((p, c) => {
                p += (c === true) ? 10 : 0;
            }, 0);
        }
    },
    actions: {
        async fetchCategories({ commit }) {
            try {
                const categories = await TriviaAPI.fetchCategories();
                commit("setCategories", categories);
            } catch (error) {
                commit("setError", error.message);
            }
        }
    }
})