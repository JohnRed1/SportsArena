// Getting References of ELEMENTS
let mainEditBtn = document.getElementById("editBtn");
let signnedIn = localStorage.getItem("loggedIn");
let profileName = document.getElementById("static-name");
let profileCountry = document.getElementById("static-country");
let profilEmail = document.getElementById("static-email");
let fullName = document.querySelector(".fullname");
let saveBtn = document.getElementById("save-changesbtn");
let backBtn = document.getElementById("back-btn");
let editFullName = document.getElementById("fullName");
let country = document.getElementById("country");
let email = document.getElementById("email");
let changePassword = document.querySelector('.change-Password');
let passwordForm = document.querySelector('.Password-change-cont');
let profileCont = document.querySelector('.Profile-cont');
let oldPassword  = document.getElementById('old-password');
let newPassword = document.getElementById('new-password');
let confirmPassword = document.getElementById('confirm-password');
let savePassword = document.getElementById('save-password');
let passwordBackBtn = document.getElementById('Password-backBtn');
let errorMsg = document.querySelector('.errorMsg');
const headerProfileName = document.querySelector('.profile-name');
let lightDark = document.querySelector('.light-dark');






// Local storage
let currentUser;
const allUsers = JSON.parse(localStorage.getItem("database"));
let activeUser = localStorage.getItem("activeuser");
currentUser = checkForUser();
console.log(currentUser);

// Event Listeners to buttons
mainEditBtn.addEventListener("click", showEditForm);
backBtn.addEventListener("click", closeForm);
saveBtn.addEventListener("click", saveChanges);
changePassword.addEventListener('click',showPasswordForm);
savePassword.addEventListener('click',passwordSave);


// function passwordSave(){

//   for (let i = 0; i < allUsers.length; i++) {
//     currentUser = allUsers[i];

//     if (currentUser.password === oldPassword.value) {

//       currentUser.password = newPassword.value;

//       if (newPassword.value !== confirmPassword.value){
//         errorMsg.innerText = 'Password not match';
//       }
   
//       //  alert('Password Changed');
//       return currentUser;
//     }
//     else{
//       console.log(oldPassword.value);
//       errorMsg.innerText = 'Old Password Not Correct';
//       setTimeout(function () {
//         errorMsg.innerText = '';
//       }, 2000);
    
//     }
//   }





//   // let updatedPassword = JSON.parse(JSON.stringify(allUsers));

//   // for (let i = 0; i < updatedPassword.length; i++) {
//   //   let currentPasswordindex = updatedPassword[i];


//   //   if (currentPasswordindex === curr) {
//   //     currentPasswordindex.password = newPassword.value;
//   //     if(newPassword.value !== confirmPassword){
//   //       errorMsg.innerText = 'Password not match';
//   //     }
//   //     else{
//   //       errorMsg.innerText = 'Password successfully changed';

//   //     }


    
//   //   }
//   // }
  
  



  

  


// }

function passwordSave() {
  
  // Find the user by their username
  const updatedUsers = allUsers.map(user => {



       
    if (user.username === activeUser) {
      if (oldPassword.value !== '' && user.password === oldPassword.value) {
        if (newPassword.value !== '' && newPassword.value === confirmPassword.value) {

          user.password = newPassword.value;
          errorMsg.innerText = 'Password successfully changed';

          setTimeout(function () {
            errorMsg.innerText = '';
          }, 2000);
  
        } else {

          errorMsg.innerText = 'New password and confirm password do not match';
          setTimeout(function () {
            errorMsg.innerText = '';
          }, 2000);

        }
      } else {
        errorMsg.innerText = 'Old Password Not Correct';

        setTimeout(function () {
          errorMsg.innerText = '';
        }, 2000);
      
      }
    }
    return user;
  });



  // Update the local storage with the modified users
   localStorage.setItem("database", JSON.stringify(updatedUsers));
   

  


  
  
}


function showProfile(){
  profileCont.style.display ='inline-block';
  passwordForm.style.display = 'none';

};


function showPasswordForm (){

  passwordForm.style.display = 'flex';
  profileCont.style.display = 'none';

  //  oldPassword.value = `${currentUser.password}`;

};


window.onload = function () {
  checkStatus();
};
// Function to check  for user data in database
function checkForUser() {
  for (let i = 0; i < allUsers.length; i++) {
    currentUser = allUsers[i];

    if (currentUser.username == activeUser) {
      headerProfileName.innerHTML = currentUser.username;
      return currentUser;
    }
  }
}

// Function to save changes
function saveChanges() {

  //let updatedUser = JSON.parse(localStorage.getItem("database"));
   let updatedUser = JSON.parse(JSON.stringify(allUsers));


  for (let i = 0; i < updatedUser.length; i++) {
    let currentUserindex = updatedUser[i];
    let editedFullName = editFullName.value.split(" ");

    if (currentUserindex.username == activeUser) {
      currentUserindex.email = email.value;
      currentUserindex.country = country.value;
      currentUserindex.firstName = editedFullName[0];
      currentUserindex.lastName = editedFullName[editedFullName.length - 1];
      // fullName.innerHTML = `${editedFullName[0]} ${editedFullName[editedFullName.length - 1]}`;
    
    }
  }
  closeForm();
  
  localStorage.setItem("database", JSON.stringify(updatedUser));


 
};


// Function to show Input Fields
function showEditForm() {
  saveBtn.style.display = "inline-block";
  backBtn.style.display = "inline-block";

  editFullName.value = `${currentUser.firstName} ${currentUser.lastName}`;
  country.value = "Nigeria";
  email.value = currentUser.email;

  editFullName.style.display = "inline-block";
  country.style.display = "inline-block";
  email.style.display = "inline-block";

  profileName.style.display = "none";
  profilEmail.style.display = "none";
  profileCountry.style.display = "none";

  mainEditBtn.style.display = "none";
}
// Function to Remove Input Fields
function closeForm() {
  saveBtn.style.display = "none";
  backBtn.style.display = "none";

  profileName.innerHTML = editFullName.value;
  profilEmail.innerHTML = email.value;
  profileCountry.innerHTML = country.value;

  editFullName.style.display = "none";
  country.style.display = "none";
  email.style.display = "none";

  profileName.style.display = "block";
  profilEmail.style.display = "block";
  profileCountry.style.display = "block";

  mainEditBtn.style.display = "inline-block";
}
// Function to check if user is signed in
function checkStatus() {
  if (!signnedIn) {
    mainEditBtn.style.display = "none";
    profileName.innerHTML = "John Red";
    fullName.innerHTML = "John Red";
    changePassword.style.display ='none';
  } else {
    editBtn.style.display = "flex";
    profileName.innerHTML = `${currentUser.firstName} ${currentUser.lastName}`;
    // fullName.innerHTML = `${currentUser.firstName} ${currentUser.lastName}`;
    profilEmail.innerHTML = `${currentUser.email}`;
  }
}

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark");
  lightDark.innerHTML = `<span class="material-symbols-outlined">
  dark_mode
  </span>`;

}
