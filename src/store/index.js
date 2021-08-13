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
        category: -1,
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
            state.category = parseInt(payload, 10);
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
        isAnswerCorrect: (state) => (index) => {
            return state.answers[index] === state.triviaQuestions[index].correct_answer;
        },
        /**
         * Retrieves the number of points based on the number of correctly answered questions.
         * <p>
         * This method always returns the number of points.
         * 
         * @returns the number of points a user has recieved
         */
        getPoints: state => {
            return state.answers.reduce((pre, cur, i) => {
                return pre + ((state.answers[i] === state.triviaQuestions[i].correct_answer) ? 10 : 0);
            }, 0);
        }
    },
    actions: {
        async fetchCategories({ commit }) {
            try {
                const categories = await TriviaAPI.fetchCategories();
                commit("setCategories", categories);
            } catch (error) {
                console.log(error)
            }
        },
        /**
         * Retrieves trivia questions from an external API using preferences such as 
         * number of questions, category and difficulty.
         * These are then used to update the current state of the trivia questions.
         * <p>
         * An error is thrown if the retrieval process was unsuccessful.
         */
        async fetchQuestions({ commit, state }) {
            try {
                const preferences = [state.numberOfQuestions, state.category, state.difficulty];
                const questions = await TriviaAPI.fetchQuestions(preferences);
                commit("setTriviaQuestions", questions)
            } catch (error) {
                console.log(error)
            }
        }
    }
})