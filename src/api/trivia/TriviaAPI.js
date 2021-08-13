const CATEGORY_URL = "https://opentdb.com/api_category.php";
const BASE_URL = "https://opentdb.com/api.php?amount=";

export const TriviaAPI = {

    /**
     * Fetches a set of categories from a trivia API.
     * <p>
     * This method will always return a list of categories,
     * or throw an error if there were any problems.
     * 
     * @returns the set of categories retrieved from an external API.
     */
    async fetchCategories() {
        try {
            const response = await fetch(CATEGORY_URL);
            const categories = await response.json();
            return categories.trivia_categories;
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Retrieves a list of trivia questions from an external API, this functions parameters are used 
     * to modify the trivia questions that are fetched. The values from the API is encoded, so all this data
     * gets decoded into a normal string.
     * <p>
     * This function always returns a list of trivia questions, if there were problems with
     * the external API, then an error is thrown.
     * 
     * @param {*} preferences these parmas are used to modify the URL from which the data is fetched.
     * @returns the set of trivia questions fetched from external API.
     */
    async fetchQuestions(preferences) {
        let API_URL = BASE_URL + (preferences[0]) + ((preferences[1] !== -1) ?
            "&category=" + preferences[1] : "") + ("&difficulty=") + (preferences[2] + "&encode=base64");
        try {
            const response = await fetch(API_URL);
            const questions = await response.json();
            return questions.results.map(tQuestion => {
                return {
                    question: this.getDecodedString(tQuestion.question),
                    correct_answer: this.getDecodedString(tQuestion.correct_answer),
                    incorrect_answers: tQuestion.incorrect_answers.map(wrongAnswer => {
                        return this.getDecodedString(wrongAnswer);
                    })
                }
            })
        } catch (error) {
            console.log(error.message);
        }

    },
    /**
     * Decodes a string that has been encoded with base64 encoding.
     * <p>
     * This method always returns a decoded string.
     * 
     * @param {*} sentence The string to be decoded.
     * @returns a text string decoded from base64.
     */
    getDecodedString(sentence) {
        return new TextDecoder().decode(Buffer.from(sentence, 'base64'))
    }
}