const CATEGORY_URL = "https://opentdb.com/api_category.php";

export const TriviaAPI = {

    async fetchCategories() {
        try {
            const response = await fetch(CATEGORY_URL);
            const categories = await response.json();
            return categories.trivia_categories;
        } catch (error) {
            console.log(error);
        }
    }
}