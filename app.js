getRandomMeal();

async function getRandomMeal() {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    ).data;
    const randomMeal = await resp;

    console.log(randomMeal);
}

async function getMealById(id) {
    const meal = await fetch(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
    );
    const randomMeal = await resp;
}

async function getMealsBySearch(term) {
    const meal = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
    );
}