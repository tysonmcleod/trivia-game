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
    async fetchQuestions (preferences) {
        let API_URL = BASE_URL+(preferences[0])+((preferences[1] === -1) ?
            ("&category=")+(preferences[1]) : "") + ("&difficulty=")+(preferences[2]);
            console.log(API_URL);
        try{
            let response = await fetch(API_URL);
            this.questions = await response.json();
            console.log(this.questions.results)
            return this.questions.results
        } catch (error) {
            console.log(error.message);
        }  
    }
}