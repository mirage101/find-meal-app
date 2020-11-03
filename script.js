const search = document.getElementById('search'),
      submit = document.getElementById('submit'),
      random = document.getElementById('random'),
      mealsEl = document.getElementById('meals'),
      resultheading = document.getElementById('result-heading'),
      single_mealEl = document.getElementById('single-meal'),
      area = document.getElementById('area'),
      adv_search=document.getElementById('adv_search');

const mealNav = document.querySelector('.meal-nav-menu');
let flag= false;

//Search meal and fetch from API
function searchMeal(e){
    e.preventDefault();

    //Clear single meal
    single_mealEl.innerHTML = '';

    //Get the search term
    const term = search.value;
  
    //Check for empty
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultheading.innerHTML = `<h2>Search results for '${term}':</h2>`;

                if(data.meals == null){
                    resultheading.innerHTML = `<p>There are no search results.Try again</p>`
                }else{  
                    mealsEl.innerHTML = data.meals.map(meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `)
                    .join(''); //output as a string
                }
            });
            //Clear search text
            search.value = '';
    }else{
        alert('Please enter a search term')
    }
}
//Fetch meal by ID
function getMealById(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data =>{
        //console.log(data)
        const meal = data.meals[0];

        addMealToDOM(meal);
    })
}

//get Random meal
function getRandomMeal(){
    //Clear meals and headings
    mealsEl.innerHTML = '';
    resultheading.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data =>{
        //console.log(data)
        const meal = data.meals[0];

        addMealToDOM(meal);
    })
}


//Add meal to DOM
function addMealToDOM(meal){
    const ingredients = [];
    for(let i = 1; i <= 20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }else{
            break;
        }
    }

    single_mealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ingr => `<li>${ingr}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function searchMealByLetter(){
    const term = search.value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        resultheading.innerHTML = `<h2>Search results for '${term}':</h2>`;

        if(data.meals == null){
            resultheading.innerHTML = `<p>There are no search results.Try again</p>`
        }else{  
            mealsEl.innerHTML = data.meals.map(meal => `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
            `)
            .join(''); //output as a string
        }
    });
   
   
}

function displayMealCategories(){
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    .then(res => res.json())
    .then(data => {
        //console.log(data.categories);
        const categories = data.categories;
        let result;
        if(categories != ''){
            for(let i = 0; i <= categories.length; i++){
                //console.log(categories[i]['strCategory']);            
                mealNav.innerHTML+=`<li><a href="#" title="${categories[i]['strCategory']}" class="nav-el">${categories[i]['strCategory']}</a></li>`;
            }
        }

    });
}

function displayMealAreas(){
    
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
       
    
            for(let l = 0; l<=data.meals.length;l++){
                area.innerHTML += `<option value="${data.meals[l].strArea}">${data.meals[l].strArea}</option>`;
            }
    

   
   });   
}

function showRecipesFromCategory(clickedEl){
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${clickedEl}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        resultheading.innerHTML = `<h2>Search results for '${clickedEl}':</h2>`;

        if(data.meals == null){
            resultheading.innerHTML = `<p>There are no search results.Try again</p>`
        }else{  
            mealsEl.innerHTML = data.meals.map(meal => `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
            `)
            .join(''); //output as a string
        }
    });   
}


function filterByArea(selArea){

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selArea}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        resultheading.innerHTML = `<h2>Search results for '${selArea}':</h2>`;

        if(data.meals == null){
            resultheading.innerHTML = `<p>There are no search results.Try again</p>`
        }else{  
            mealsEl.innerHTML = data.meals.map(meal => `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
            `)
            .join(''); //output as a string
        }
    });   
   
}

//Event Listeners
submit.addEventListener('submit', searchMeal);
search.addEventListener('keyup', searchMealByLetter);

mealsEl.addEventListener('click', e=>{
    const mealInfo = e.path.find(item =>{
        if(item.classList){
            return item.classList.contains('meal-info');
        }else{
            return false;
        }
    });

    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealById(mealID);
    }
    setTimeout(()=>{
        const offsetTop = document.querySelector('.single-meal').offsetTop;
        scroll({
            top: offsetTop,
            behavior: "smooth"
        });


        let tagEls = document.querySelectorAll('.main ul li');
       
        for (var z = 0, len = tagEls.length; z < len; z++) {
            tagEls[z].addEventListener('mouseover', (e)=>{
                              
                console.log(e.target)
                const tagEl = e.target.innerText;
                const ingredDescArr = tagEl.split(" - ")
                
                const ingredName = ingredDescArr[0].trim();
                console.log(ingredName);

                var DOM_img = document.createElement("img");
                DOM_img.src = "https://www.themealdb.com/images/ingredients/"+ingredName+".png";
                DOM_img.classList.add('igred-img')
                e.target.appendChild(DOM_img);
              
               
                //single_mealEl.innerHTML = '';
                
            });    
            tagEls[z].addEventListener('mouseout', (e)=>{
                let hovImg = document.querySelector(".main ul li img"); 
                
               e.target.removeChild(hovImg);
               
           });    
        }


    }, 600);
    
    console.log(mealInfo);
});

random.addEventListener('click', getRandomMeal);
adv_search.addEventListener('click', (e) =>{
    mealsEl.innerHTML ='';
    const selArea = area.options[area.selectedIndex].value;
    console.log(selArea)
    filterByArea(selArea)
});


displayMealCategories();
displayMealAreas();


function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}

setTimeout(()=>{
    let navEls = document.querySelectorAll('.nav-el');

    for (var i = 0, len = navEls.length; i < len; i++) {
        console.log(navEls[i]);
        navEls[i].addEventListener('click', (e)=>{
            //console.log(e.target.innerText);
            e.preventDefault();
            single_mealEl.innerHTML = '';
            const clickedEl = e.target.innerText;
            showRecipesFromCategory(clickedEl);
           
          
        });    
    }
  
}, 200)

area.addEventListener('change', ()=>{
    console.log('change')
    single_mealEl.innerHTML = '';
    const selArea = area.options[area.selectedIndex].value;
    filterByArea(selArea);
})


