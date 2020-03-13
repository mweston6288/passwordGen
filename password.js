/* Plan outline: 
1) Prompt user for parameters
2) generate 1 emergency value for each item with an emergency location
3) make sure the emergency locations have no overlap
4) make a number array of ASCII values
5) Convert the values to their corresponding char values
6) Substitute the emergency values in
*/

// Get the User's input on what the password needs
var length,capital,lowercase,numbers,special

// Prompts the user for parameters
function getParameters(){
    
    var any = false
    length = prompt("How many characters will the password have?(8 - 128 limit)")
    length = parseInt(length, 10)
    // Security net to ensure user does not set length to a string or negative number
    while (isNaN(length) || length < 3 || length > 128){
        length = prompt("How many characters will the password have?(8 - 128 limit)")
        length = parseInt(length, 10)
    }

    while (!any){
        capital = confirm("Are there capital letters?")
        lowercase = confirm("Are there lowercase letters?")
        numbers = confirm("Are there numbers?")
        special = confirm("Are there special characters?")
        if (capital || lowercase || numbers || special)
        {
            any = true
        }
        else{
            alert("Password must contain at least one type of character")
        }
    }
}
function makePassword(string){
    getParameters()

    // Generate a random number from 0-3 to determine what will go in each index of the password
    // 0 = capital
    // 1 = lowercase
    // 2 = number
    // 3 = special character
    var i = 0
    while(i<length)
    {
        var x = Math.floor(Math.random() * 4)
        if (x == 0 && capital == true){
            string[i] = generateCapital();
        }
        else if (x == 1 && lowercase == true){
            string[i] = generateLowerCase();
        }
        else if (x == 2 && numbers == true){
           string[i] = generateNumber();
        }
        else if (x == 3 && special == true){
            string[i] = generateSpecial();
        }
        else{
            continue;
        }
        // convert ints to ASCII values
        string[i] = String.fromCharCode(string[i]);
        i++
    }
    // An additional precaution to ensure at least one of every char type is put in the password
    string = makeEmergencyValues(string)
    return string;
}

function generateCapital(){
    return Math.floor(Math.random()*26 + 65)
}
function generateLowerCase(){
    return Math.floor(Math.random()*26 + 97)
}
function generateNumber(){
    return Math.floor(Math.random()*10 + 48)
}
// Because special characters are broken into 4 sequential groups in ASCII, we first generate a random number from 0-3 which will decide which set of ASCII values will be pulled from
function generateSpecial(){
    var i = Math.floor(Math.random() * 4)
    if (i == 0)
    {
        return Math.floor(Math.random()*15 + 33)
    }
    else if(i == 1){
        return Math.floor(Math.random()*7 + 58)
    }
    else if(i == 2){
        return Math.floor(Math.random()*6 + 91)
    }
    else if(i == 3){
        return Math.floor(Math.random()*4 + 123)
    }
}
// Create a capital, lowercase, number, and special char that will definitely be in the password
function makeEmergencyValues(string){
    // Determine where each item will go
    var i = Math.floor(Math.random()* this.length) 
    var j = Math.floor(Math.random()* this.length)
    var k = Math.floor(Math.random()* this.length) 
    var l = Math.floor(Math.random()* this.length) 

    // Ensure none of the values are the same
    while (j == i || j == k || j == l){
        j = Math.floor(Math.random()* length)
    }
    while (k == i || k == j || k == l){
        k = Math.floor(Math.random()* length)
    }
    while (l == i || l == j || l == k){
        l = Math.floor(Math.random()* length)
    }

    if (capital == true)
        string[i] = String.fromCharCode(generateCapital());
    if (lowercase == true)
        string[j] = String.fromCharCode(generateLowerCase());
    if (numbers == true)
       string[k] = String.fromCharCode(generateNumber());
    if (special == true)
        string[l] = String.fromCharCode(generateSpecial());



    // string[i] = String.fromCharCode(Math.floor(Math.random() *26 + 65))
    return string;
}

// adding an eventListener to the HTML button, when clicked, everything is run
document.getElementById("generator").addEventListener("click", function(){

var string = []
string = makePassword(string)
document.getElementById("password").disabled = false;
document.getElementById("password").textContent = string.join('')
document.getElementById("password").disabled = true;
document.getElementById("copy").disabled = false;
})

document.getElementById("copy").addEventListener("click", function(){
    var text = document.getElementById("password")
    document.getElementById("password").disabled = false;
    text.select()
    document.execCommand("copy")
    document.getElementById("password").disabled = true;
})