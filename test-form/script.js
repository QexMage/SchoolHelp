// Tar in value och minLength.
// value är värdet som vi ska kolla längden på
// minLength är minsta längden som är accepterad. Standardvärde är 2.
// Vi skapar en "regexString" för att kunna sätta vår egna variabel minLength som minsta tillåtna värdet
// sedan skapar vi en ny "RegExp" typ som går att köra .test() på
function validateMinimumLength(value, minlength = 2) {
    const regexString = `^.{${minlength},}$`
    const regex = new RegExp(regexString);
    if (!regex.test(value)) {
        return false
    }
    else {
        return true 
    }
}

// validerar så mejlen är i giltigt format
function validemail(value) {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexEmail.test(value)) {
        return false
    }
    else {
        return true 
    }
}

// validerar att lösenordet är i gilitgt format
function validpassword(value) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    if (!regex.test(value)) {
        return false
    }
    else {
        return true 
    }
}

// Kontrollerar att två strängar matchar med varandra
function matchpassword (password, confirmPassword) {
    if(password === confirmPassword)
        return true;
    return false;
}

// Denna funktion kommer ta hand om all validering som har med lösenord att göra
// den får in ett event från fältet som skickade keyup, i detta fall kommer det antingen
// vara "password" eller "confirm-password" som skickar eventet.
function validatePasswords(event) {
if(event == null) 
    return;

switch(event.target.id) {
    case "password":
        // Ifall vi är i vanliga password fältet så ska vi validera att lösenordet är giltigt
        if(validpassword(event.target.value))
        {
            event.target.classList.remove("is-invalid");
            document.getElementById(`${event.target.id}-error`).style.display = "none"

            //Ifall vi skrivit tidigare har matchat lösenordet i confirm-password och fått ett OK därifrån
            // så kommer det inte längre vara en gilitg matchning eftersom vi ändrat i password fältet
            const confirmpassword = document.getElementById("confirm-password");
            if(matchpassword(event.target.value, confirmpassword.value)) {
                // Dom matchar, all good!
                confirmpassword.classList.remove("is-invalid");
                document.getElementById(`${confirmpassword.id}-error`).style.display = "none"
            } else 
            {
                // nu matchar dom inte, då måste vi säga till att confirm-password error rutan ska visas igen!
                confirmpassword.classList.add("is-invalid");
                document.getElementById(`${confirmpassword.id}-error`).style.display = "block"
            }
        } else 
        {
            // Inte ett giltigt lösenord! Vi skickar fram error meddelandet!
            event.target.classList.add("is-invalid");
            document.getElementById(`${event.target.id}-error`).style.display = "block"
        }
        break;
    case "confirm-password":
        // ifall vi är i confirm-password fältet ska vi validera att lösenorden matchar varandra.
        // Detta fall är enklare eftersom vi bara kommer validera att lösenorden matchar
        const confirmpassword = document.getElementById("confirm-password");
        const password = document.getElementById("password");

        if(matchpassword(password.value, confirmpassword.value)) 
        {
            // Dom matchar! visa inga felmeddelanden!
            event.target.classList.remove("is-invalid");
            document.getElementById(`${event.target.id}-error`).style.display = "none"
        } else
        {
            event.target.classList.add("is-invalid");
            document.getElementById(`${event.target.id}-error`).style.display = "block"
        }
        break;
}
}


// Fyll select dropdownsen med år från 1921 till 2021
// månad med 1 till 12
// och dag från 1 till 31
populateSelector("year", 1921, 2021)
populateSelector("month", 1, 12)
populateSelector("day", 1, 31)
function populateSelector(selectorId, to, from){
    const selector = document.getElementById(selectorId);

    for(let i = to; i <= from; ++i) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i;
        selector.appendChild(option);
    }
}

// Lyssna på ÅR, MÅNAD och DAG selectorer varje gång värdet i dropdown fältet ändras
setselectorListener();
function setselectorListener() {
    const datevalidation = document.querySelectorAll(".age")
    datevalidation.forEach(element => {
    element.addEventListener("change", function(e) {
        validateAge() // validera åldern för att se om man är över 18 varje gång värdet ändras i en Selector
     })
})

}

// Ta 
function validateAge (){
    const todayYear = new Date().getFullYear();
    const todayMonth = new Date().getMonth() + 1;
    const todayDay = new Date().getDate();

    const year =document.getElementById("year").value
    const month =document.getElementById("month").value
    const day =document.getElementById("day").value

    // Ifall År, Månad eller Dag inte är satt än så hoppar vi ur denna funktion
    if(isNaN(year) || isNaN(month) || isNaN(day) ) {
        return;
    }

    const birthDate = new Date(year, month, day);
    const currentDay = new Date(todayYear, todayMonth, todayDay);

    // Få användarens ålder i dagar, sedan dela med 365.25(0.25 för 1 skottdag var fjärde år)
    var userAge = dateDiffInDays(currentDay, birthDate) / 365.25; 
    if (userAge >= 18)
    { 
        document.getElementById('select-error').style.display= "none"
    }
    else {
        document.getElementById('select-error').style.display= "block"
    }
}

// Returnerar antal dagar mellan två datum.
function dateDiffInDays(todaysDate, birthDate) {
  var difference = todaysDate.getTime() - birthDate.getTime();
  
  return difference / (1000 * 3600 * 24);
}




var forms = document.querySelectorAll('.needs-validation')
setEventListeners()
checkform(forms)

// Loopa igenom alla element med klassen .needs-validation och sätt eventlyssnare
// som validerar fälten
function setEventListeners() {
    forms.forEach(element => {
        switch(element.type) {
            case "text":
                element.addEventListener("keyup", function(e) { 
                    if(!validateMinimumLength(e.target.value)) {
                        e.target.classList.add("is-invalid");
                        document.getElementById(`${e.target.id}-error`).style.display = "block"
                    }        
                    else {
                        e.target.classList.remove("is-invalid");
                        document.getElementById(`${e.target.id}-error`).style.display = "none"
                    }
                })
                break;

            case "email": 
                element.addEventListener("keyup", function(e) {
                    if(!validemail(e.target.value))  {
                        e.target.classList.add("is-invalid");
                        document.getElementById(`${e.target.id}-error`).style.display = "block"
                    }        
                    else {
                        e.target.classList.remove("is-invalid");
                        document.getElementById(`${e.target.id}-error`).style.display = "none"
                    }
                })
                break;
            
            case "password": 
            // Gör en "specialare här. Eftersom vi har två olika password fält som ska valideras på två olika sätt.
            element.addEventListener("keyup", function(e) {
                validatePasswords(e);
            })
            break;

            case "number": 
            element.addEventListener("keyup", function(e) {
                if(!validateMinimumLength(e.target.value, 5)) {
                    e.target.classList.add("is-invalid");
                    document.getElementById(`${e.target.id}-error`).style.display = "block"
                }        
                else {
                    e.target.classList.remove("is-invalid");
                    document.getElementById(`${e.target.id}-error`).style.display = "none"
                }
            })
            break;
        }     
    })
}

// function checkform(elements) {
//     let disable = false
//     let errors = document.querySelectorAll('.is-invalid')
//     let submitButton = document.querySelectorAll('.submit')[0]   

//     elements.forEach(element => {
//         if(element.value === "" || errors.length > 0)
//             disable = true
//     })     

//     if(submitButton !== undefined)
//         submitButton.disabled = disable
// }

// function onSubmit(e) {
//     e.preventDefault()
//     console.log("submitted")
// }