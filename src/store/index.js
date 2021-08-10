import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        triviaQuestions: [],
        answers: [],
        name: "",
        points: 0,
        difficulty: "",
        category: "",
        numberOfQuestions: 0
    },
    mutations: {
        setTriviaQuestions: (state, payload) => {
            state.triviaQuestions = payload;
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
        setPoints: (state, payload) => {
            state.points = payload;
        },
        setDifficulty: (state, payload) => {
            state.difficulty = payload;
        },
        setNumberOfQuestions: (state, payload) => {
            state.numberOfQuestions = payload;
        }
    },
    getters: {

    },
    actions: {

    }
})