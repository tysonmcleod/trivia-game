const CATEGORY_URL = "https://opentdb.com/api_category.php";
const BASE_URL = "https://opentdb.com/api.php?amount=";

export const TriviaAPI = {

    async fetchCategories() {
        try {
            const response = await fetch(CATEGORY_URL);
            const categories = await response.json();
            return categories.trivia_categories;
        } catch (error) {
            console.log(error);
        }
    },
    async fetchQuestions(preferences) {
        let API_URL = BASE_URL + (preferences[0]) + ((preferences[1] !== -1) ?
            ("&category=") + (preferences[1]) : "") + ("&difficulty=") + (preferences[2] + "&encode=base64");
        try {
            const response = await fetch(API_URL);
            const questions = await response.json();
            return questions.results.map(tQuestion => {
                return {
                    question: Buffer.from(tQuestion.question, "base64"),
                    correct_answer: Buffer.from(tQuestion.correct_answer, "base64"),
                    incorrect_answers: tQuestion.incorrect_answers.map(wrongAnswer => {
                        return Buffer.from(wrongAnswer, "base64");
                    })
                }
            })
        } catch (error) {
            console.log(error.message);
        }

    },
    getDecodedString(sentence) {
        return Buffer.from(sentence, 'base64')
    }
}