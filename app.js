const mealsEl = document.getElementById('meals');
const favoriteContainer = document.getElementById('fav-meals');
const mainContainer = document.querySelector('.fav-container');

const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');



getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
    );

    const respData = await resp.json();

    const meal = respData.meals[0];

    return meal;

}

async function getMealsBySearch(term) {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
    );

    const respData = await resp.json();
    const meals = respData.meals;

    return meals;
}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
            <div class="meal-header">
            ${
                random
                   ? `
            <span class="random"> Random Recipe</span>`
                    : ""
            }
                <img
                    src="${mealData.strMealThumb}"
                    alt="${mealData.strMeal}"
                />
            <div class="meal-body">
                <h4>${mealData.strMeal}</h4>
                <button class="fav-btn">
                    <i class="fas fa-heart"></i>
                    </button>
            </div>
    `;

    const btn =  meal.querySelector('.meal-body .fav-btn');
    
    btn.addEventListener('click', (e) => {
        if(btn.classList.contains('active')) {
            removeMealLS(mealData.idMeal)
            btn.classList.remove('active');
        } else {
            addMealLS(mealData.idMeal);
            btn.classList.add('active');
        }
        e.target.classList.toggle('active')

      
        fetchFavMeals();
    });

    mealsEl.appendChild(meal);

}

// add meals to local storage
function addMealLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem("mealIds", JSON.stringify
    ([...mealIds, mealId]));
}


function removeMealLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem(
        "mealIds",
        JSON.stringify(mealIds.filter((id) => id
        !== mealId))
    );
}

function getMealsLS() {
    const mealIds =  JSON.parse(localStorage.
        getItem("mealIds"));

        return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
  // clean the container
  favoriteContainer.innerHTML = ""

    const mealIds = getMealsLS();

    for(let i=0; i<mealIds.length; i++) {
        const mealId = mealIds[i];
        meal = await getMealById(mealId);

        addMealFav(meal);
    }

    console.log(meals);

    // add them to the screen
}



function addMealFav(mealData) {
    const favMeal = document.createElement('li');
    // meal.classList.add('meal');

    favMeal.innerHTML = `
        <img   
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        /><span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas
        fa-window-close"></i></button>
    `;

    const btn = favMeal.querySelector('.clear');

    btn.addEventListener('click',() => {
       removeMealLS(mealData.idMeal);

       fetchFavMeals();

    });
    favoriteContainer.appendChild(favMeal);
}

window.addEventListener('load', function() {
    setTimeout(function(){
function favMealHeight() {
    if (favoriteContainer.innerHTML.length == 0) {
        console.log('its empty')
        mainContainer.style.minHeight = "0px";
    } else {
        console.log('its NOT empty')
    }
}
favMealHeight();
    }, 500 );
});

searchBtn.addEventListener('click', async () => {

    mealsEl.innerHTML = "";

    const search = searchTerm.value;
    const meals = await getMealsBySearch(search);

    if (meals) {
    meals.forEach((meal) => {
        addMeal(meal);
    });
    }
});


