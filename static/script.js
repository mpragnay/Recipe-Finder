let ingredientsContainer=document.getElementById("ingredientsContainer");
let ingredientInput=document.getElementById("ingredientInput");
let recipesPageContainer=document.getElementById("recipesPageContainer");
let recipesContainer=null;
let recipesContainerId="recipesContainer";

let ingredientsList=[];
let ingCount=0;
let searches=0;

let recipeIngId=[];
let recipePrepId=[];

function displayRecipes(titles,ingredients,directions){
    let recipesContainerToRemove = document.getElementById(recipesContainerId+searches);
    if (recipesContainerToRemove) {
        recipesPageContainer.removeChild(recipesContainerToRemove);
    }
    searches++;
    recipesContainer=document.createElement("div");
    recipesContainer.classList.add("text-left");
    recipesContainer.id=recipesContainerId+searches;
    recipesPageContainer.appendChild(recipesContainer);
    
    let number_recipes=titles.length;
    for(let i=0;i<number_recipes;i++)
    {
        let index=i+1;
        ingCount+=1;
        let unique_id=ingCount;
        let divContainerEl=document.createElement("div");

        let divContainerIng=document.createElement("div");
        let ingTitleEl=document.createElement("p");
        ingTitleEl.textContent="Ingredients List";
        ingTitleEl.classList.add("recipe-container-heading");
        divContainerIng.appendChild(ingTitleEl);
        let ingredientsList=JSON.parse(ingredients[i]);
        for(let j=0;j<ingredientsList.length;j++)
        {
            let spanEl=document.createElement("span");
            spanEl.textContent=ingredientsList[j];
            divContainerIng.appendChild(spanEl);
            let brEl=document.createElement("br");
            divContainerIng.appendChild(brEl);
        }
        divContainerIng.classList.add("d-none");
        divContainerIng.id="ingredientRecipe"+unique_id;

        let brEl=document.createElement("br");

        let divContainerPrep=document.createElement("div");
        let prepTitleEl=document.createElement("p");
        prepTitleEl.textContent="Preparation Method";
        prepTitleEl.classList.add("recipe-container-heading");
        divContainerPrep.appendChild(prepTitleEl);
        let directionsList=JSON.parse(directions[i]);
        for(let j=0;j<directionsList.length;j++)
        {
            let spanEl=document.createElement("span");
            spanEl.textContent=directionsList[j];
            divContainerPrep.appendChild(spanEl);
            let brEl=document.createElement("br");
            divContainerPrep.appendChild(brEl);
        }
        divContainerPrep.classList.add("d-none");
        divContainerPrep.id="preparationRecipe"+unique_id;

        let titleEl=document.createElement("a");
        titleEl.setAttribute("href","#");
        // titleEl.onclick=function(unique_id){
        //     document.getElementById("ingredientRecipe"+unique_id).classList.toggle("d-none");
        //     document.getElementById("preparationRecipe"+unique_id).classList.toggle("d-none");
        // };
        titleEl.onclick = function(uniqueId) {
            return function() {
                document.getElementById("ingredientRecipe" + uniqueId).classList.toggle("d-none");
                document.getElementById("preparationRecipe" + uniqueId).classList.toggle("d-none");
            };
        }(unique_id);
        
        titleEl.textContent=index+". "+titles[i];

        divContainerEl.appendChild(titleEl);
        divContainerEl.appendChild(divContainerIng);
        divContainerEl.appendChild(brEl);
        divContainerEl.appendChild(divContainerPrep);
        recipesContainer.appendChild(divContainerEl);
    }
}

function onDeleteIngredient(ingId){
    delEl=document.getElementById(ingId);
    ingredientsContainer.removeChild(delEl);
    let index=ingredientsList.findIndex(function(eachIng){
        let eachIngId="ingredient"+eachIng.unique_no;
        if(eachIngId===ingId){
            return true;
        }
        else{
            return false;
        }
    })
    ingredientsList.splice(index,1);
}

function addIngredient(){
    if(ingredientInput.value==="")
    {
        alert("Enter a valid ingredient");
        return;
    }
    // console.log("adding element : "+ingredientInput.value);
    ingCount+=1;
    let newIng={
        ingredient : ingredientInput.value,
        unique_no : ingCount
    }
    let ingId="ingredient"+ingCount;
    ingredientsList.push(newIng);

    let spanEl=document.createElement("span");
    spanEl.classList.add("ingredient-container", "mb-1");
    spanEl.textContent=ingredientInput.value;

    let delEl=document.createElement("i");
    delEl.classList.add("far", "fa-trash-alt", "delete-icon");
    delEl.onclick= function(){
        onDeleteIngredient(ingId);
    }
    let brEl=document.createElement("br");

    let divContainer=document.createElement("div");
    divContainer.id=ingId;
    divContainer.appendChild(spanEl);
    divContainer.appendChild(delEl);
    divContainer.appendChild(brEl);

    ingredientsContainer.appendChild(divContainer);
    ingredientInput.value="";
}

function searchRecipe() {
    const queryParams = ingredientsList.map(ing => {
        return `ingredients[]=${encodeURIComponent(ing.ingredient)}`;
    }).join('&');

    const url = `/search?${queryParams}`;
    // const url = `http://127.0.0.1:5000/search?${queryParams}`;
    // console.log(url);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(jsonData => {
            // console.log(jsonData);
            let {titles} = jsonData;
            let {ingredients} = jsonData;
            let {directions} = jsonData;
            // console.log(directions);
            displayRecipes(titles,ingredients,directions);
            // return JSON.parse(jsonData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}