let redirectToSignin = false;
// Get references to elements
const signInForm = document.getElementById("signin-form");
const signInButton = document.getElementById("sign-in-button");
const signInUsernameInput = document.getElementById("signin-username");
const signInPasswordInput = document.getElementById("signin-password");
const signUpForm = document.getElementById("signup-form");
const signUpButton = document.getElementById("sign-up-button");
const recentPost = document.querySelector(".RP-Title");
const trendingPost = document.querySelector(".TP-Title");
let getStarted = document.querySelector(".Get-Started");
let postTitle = document.querySelectorAll('.RP-Title');
let authorName = document.querySelectorAll('.Authors-name');
let postVisual = document.querySelectorAll('.RP-visual');
let postCategory = document.querySelectorAll('.Post-Category');

let storedSportsData = JSON.parse(localStorage.getItem('sportsData'));

console.log(storedSportsData);

      postVisual.forEach((postVisual,index) => {
        postVisual.innerHTML = `<img src="${storedSportsData[index].img}" alt="" />`;
      })

      postCategory.forEach((postCategory,index) => {
        postCategory.innerText = storedSportsData[index].category;
      })


       postTitle.forEach((postTitle,index) => {
      postTitle.innerText = storedSportsData[index].title; 
     postTitle.style.fontWeight = '700';
    
     })


     if(storedSportsData.length >= 0){
     authorName.forEach((authorName,index) => {
      authorName.innerText = storedSportsData[index].author
     })
    }

    
  
   









authorName.forEach(function(authorName){
  authorName.addEventListener('click', () =>{
    window.location.href= "Author's-Page.html";
  })
})

let dataBase = JSON.parse(localStorage.getItem('database')) || [];

// console.log(dataBase);

// Snackbar functions
function emptyFieldAlert(message) {
  // Get the snackbar DIV
  let snackbar = document.getElementById("empty-field-alert");

  // Add the "show" class to DIV

  snackbar.className = "show";
  snackbar.textContent = "";
  snackbar.textContent = message;

  redirectToSignin = true;

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    snackbar.className = snackbar.className.replace("show", "");
  }, 2000);
}

// Function to handle sign-up
function signUp() {
  // event.preventDefault();

  // Get user input values
  const firstName = document.getElementById("Firstname").value;
  const lastName = document.getElementById("Lastname").value;
  const username = document.getElementById("Username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const email = document.getElementById("email").value;

  
  // Validation
  if (
    !firstName ||
    !lastName ||
    !username ||
    !password ||
    !confirmPassword ||
    !email
  ) {
    emptyFieldAlert("Please fill in all fields.");
    return;
  }
  else
  if (password !== confirmPassword) {
    document.querySelector(".WarningP").innerHTML = "Passwords do not match.";
    setTimeout(function () {
      document.querySelector(".WarningP").innerHTML = "";
    }, 2000); 
    return;
  }
  else {

  // Create a user object
  const user = {
    firstName,
    lastName,
    username,
    email,
    password,
  };

  
  dataBase.push(user);



 // const userJSON = JSON.stringify(user);
 
  // Save user data in local storage
  localStorage.setItem("database", JSON.stringify(dataBase));

  // Clear the form
  document.getElementById("signup-form").reset();

  //dataBase.push(localStorage.getItem("userKey"));

  emptyFieldAlert("Sign up successful");

  // console.log(dataBase);

   setTimeout(function () {
     window.location.href = "Sign_in.html";
   }, 2000); // Redirect after 2 seconds (adjust the time as needed)
  }
}

// Sign in Scripts
function signIn() {
  
  // event.preventDefault();
  const username = signInUsernameInput.value;
  let password = signInPasswordInput.value;
  const storedUserData = localStorage.getItem("database");
  const user = JSON.parse(storedUserData);

  

  if(!username || !password){
    emptyFieldAlert("Please fill in your login details")
  }

  else if(storedUserData){

    // Check if the entered password matches the stored password
    for(let i = 0; i < user.length; i++ ) {

      if (username === user[i].username && password === user[i].password) {
        // alert("Sign-in successful!");
        emptyFieldAlert("Sign In Successful");
  
        localStorage.setItem('loggedIn', 'yes');
        localStorage.setItem('activeuser', username);
        
  
        setTimeout(function () {
          window.location.href = "index.html";
        }, 2000); // Redirect after 2 seconds (adjust the time as needed)
  
        return true;
      }
       else if (username !== user[i].username ) {
  
        emptyFieldAlert("Username not found. Please sign up first.")
       
      }
      else if (password !== user[i].password){
  
        emptyFieldAlert("Password Incorrect");
  
        if(password === ""){
  
          emptyFieldAlert("Please enter your password.")
  
  
        }
      }
    }
  }
  
  
 

  }

function clickPost() {
  if (recentPost) {
    window.location.href = "Single-Post.html";
  } else if (trendingPost) {
    window.location.href = "Single-Post.html";
  }
}



function redirectToSignUp() {
  if (getStarted) {
    window.location.href = " Get_started.html";
  }
}


