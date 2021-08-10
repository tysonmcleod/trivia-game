import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        triviaQuestions: [],
        answers: [],
        user: {}
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
        setUser: (state, payload) => {
            state.user = payload;
        },
        setUserPoints: (state, payload) => {
            state.user.points = payload;
        }
    },
    getters: {

    },
    actions: {
        
    }
})