const CATEGORY_URL = "https://opentdb.com/api_category.php";

export const TriviaAPI = {

    async fetchCategories() {
        return (await fetch(CATEGORY_URL)).json();
    }
}