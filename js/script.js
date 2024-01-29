

function openSideNav() {
    $(".side-nav").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".list li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let navWidth = $(".side-nav .nav-tab").outerWidth()
    $(".side-nav").animate({
        left: -navWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".list li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".side-nav i.open-close-icon").click(() => {
    if ($(".side-nav").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})








let data = [];

function displayMeals() {
    let cartoona = "";

    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div  class="meal position-relative overflow-hidden rounded-2 ">
                    <img class="w-100" src="${data[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
        </div>`
    }
    document.getElementById('rowData').innerHTML = cartoona
}


//  S T A R T  C A T E G O R Y 

async function getCategoryData() {
    closeSideNav()
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    if (response.status == 200) {
        let finalResponse = await response.json();
        data = finalResponse.categories;
        console.log(data);
        displayCategories();


    }
    else if (response.status == 404) { alert('not found') }
}


async function getCategoryMeals(category = 'chicken') {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    //    console.log(response);
    if (response.status == 200) {
        let finalResponse = await response.json()
        data = finalResponse.meals;
        console.log(data);
        displayMeals()

    } else if (allArea.status == 404) {
        alert('not found')
    }
}

function displayCategories() {
    let cartoona = "";


    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div  onclick="getCategoryMeals('${data[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 ">
                    <img class="w-100 meal-img" src="${data[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center p-2">
                        <h3>${data[i].strCategory}</h3>
                        <p>${data[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}}</p>
                    </div>
                </div>
        </div>
        `

    }


    document.getElementById('rowData').innerHTML = cartoona

}

getCategoryMeals()


//  E N D  C A T E G O R Y 



// S T A R T  A R E A

async function getArea() {
    closeSideNav()
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    // console.log(response)
    if (response.status == 200) {
        let finalResponse = await response.json()
        data = finalResponse.meals;
        console.log(data);
        displayArea()

    } else if (response.status == 404) {
        alert('not found')
    }
}

function displayArea() {
    let cartoona = ''
    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-3  ">
        <div onclick="getMealsByArea('${data[i].strArea}')" class=" area rounded-2 text-center  text-light">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${data[i].strArea} </h3>
        </div>
    </div>
        `
    }
    document.getElementById('rowData').innerHTML = cartoona
}


async function getMealsByArea(area) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    // console.log(response)
    if (response.status == 200) {
        let finalResponse = await response.json()
        data = finalResponse.meals;
        console.log(data);
        displayMeals()

    } else if (response.status == 404) {
        alert('not found')
    }

}

// E N D   A R E A


// S T A R T  I N G R E D I E N T S

async function getIngredients() {
    closeSideNav()
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    //    console.log(response)
    if (response.status == 200) {
        let finalResponse = await response.json()
        // console.log(finalResponse)
        data = finalResponse.meals;
        console.log(data);
        displayIngredients()

    } else if (response.status == 404) {
        alert('not found')
    }
}

function displayIngredients() {
    let cartoona = ''
    for (let i = 0; i < 20; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${data[i].strIngredient}') "  class="ingredients rounded-2 text-center text-light">
                  <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                  <h3 class= "ingredientMeal">${data[i].strIngredient} </h3>
                  <p> ${data[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>`
    }



    document.getElementById('rowData').innerHTML = cartoona
}



async function getIngredientsMeals(ingredients) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    // console.log(response)
    if (response.status == 200) {
        let finalResponse = await response.json()
        data = finalResponse.meals
        console.log(finalResponse)
        displayMeals(data)

    } else if (response.status == 404) {
        alert('not found')
    }

}


// E N D   G R A D I E N T S

async function getMealDetails(id) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    finalResponse = await response.json()
    console.log(finalResponse)
    data = finalResponse.meals

}







// E N D    I N G R E D I E N T S





// S T A R T  S E A R C H
let searchContainer = document.getElementById('#searchContainer')
function showSearchInputs() {
    closeSideNav()
    searchContainer = `
<div class="row py-4">
<div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>
<div/>
    `



    document.getElementById('rowData').innerHTML = searchContainer
}

async function searchByName(term) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    if (response.status == 200) {
        let finalResponse = await response.json()
        let data = finalResponse.meals
        console.log(data)
        displayMeals()

    }
}

async function searchByLetter(term) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    let finalResponse = await response.json()
    let data = finalResponse.meals
    console.log(data)
    displayMeals()

}



// E N D   S E A R C H


// S T A R T  C O N T A C T


let contactContainer = document.getElementById('#contact')

function displayContacts() {
    contactContainer = `
    <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        
    <div/>
    <button id="submitBtn" disabled class="btn btn-danger">Submit</button>

 
 `
    document.getElementById('rowData').innerHTML = contactContainer
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputEntered = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputEntered = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputEntered = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputEntered = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputEntered = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputEntered = true
    })

}


let nameInputEntered = false;
let emailInputEntered = false;
let phoneInputEntered = false;
let ageInputEntered = false;
let passwordInputEntered = false;
let repasswordInputEntered = false;




function inputsValidation() {
    if (nameInputEntered) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputEntered) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputEntered) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputEntered) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputEntered) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputEntered) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}


// E N D  C O N T A C T  U S