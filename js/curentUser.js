// Login status
let currentUser;
let logOutIcon = document.getElementById("So");
let bookMarkPage = document.querySelector('.BookMarks');
let commentField = document.querySelectorAll('.comment-section');



let signOut = document.querySelector(".logout");
signOut.addEventListener("click", logOut);

let commentIcon = document.querySelectorAll('.cs');

commentIcon.forEach(function(commentIcon ,index){

  commentIcon.addEventListener('click',() => {

    window.location.href = "Single-Post.html";
    
    



  
  
  
  
  } );
});








// Function to check if the user is logged in

let bookmarkedDb = [];
function checkLoginStatus() {
  

  const allUsers = JSON.parse(localStorage.getItem("database"));
  let activeUser = localStorage.getItem('activeuser');
  
  function checkForUser() {
    for (let i = 0; i < allUsers.length; i++) {
      currentUser = allUsers[i]; 
 
     if (currentUser.username == activeUser) {
       return currentUser; 
     }
   }
  };


  let currentKey = localStorage.getItem('loggedIn');
  let signIn = document.querySelector(".sign-in");
  let tagLineSignUp = document.querySelector(".Get-Started1");
  let signUp = document.querySelector(".Get-Started");
  let bookMark = document.querySelectorAll('.bookmark');
  
   
  bookMark.forEach(function(bookMark,index) {
    bookMark.addEventListener('click', function() {
      if (currentKey){

        if (bookMark.innerText == 'bookmark') {
          emptyFieldAlert("Added to Bookmark");

        bookMark.innerText = "bookmark_added";
       
          const postVisual= document.querySelectorAll('.RP-visual')[index].innerHTML; 
          const postTitle = document.querySelectorAll('.RP-Title')[index].innerText; 
          const postExcerpt = document.querySelectorAll('.RP-excerpt')[index].innerText;

          const bookmarkedItem = {
            id: generateUniqueId(),
            postVisual,
            postTitle,
            postExcerpt
          };

          // Add the bookmarked item to the array
          bookmarkedDb.push(bookmarkedItem);

          // Save the updated bookmarks array to localStorage
          localStorage.setItem('bookmarks', JSON.stringify(bookmarkedDb));

          console.log(bookmarkedDb);

           // Check if the data in local storage is a valid JSON
          const storedBookmarks = localStorage.getItem('bookmarks');
          if (storedBookmarks) {
            try {
              bookmarkedDb = JSON.parse(storedBookmarks);
              console.log('Valid bookmarks data:', bookmarkedDb);
              // console.log('valid');
              // return bookmarkedDb
            } catch (error) {
              console.error('Error parsing bookmarks data:', error);
              // Handle the error if needed
            }
          }

          



        }
        else {
          emptyFieldAlert("Removed from Bookmarks");
          bookMark.innerText = "bookmark";
          // localStorage.removeItem("bookmarks");
           // Remove the item from the array at the current index
            bookmarkedDb.splice(index, 1);

            // Save the updated bookmarks array to localStorage
            localStorage.setItem('bookmarks', JSON.stringify(bookmarkedDb));
            console.log(bookmarkedDb)
        }

      
      }
      else{

        setTimeout(function () {
          window.location.href = "Sign_in.html";
        }, 1000);
      }
    });
  });

  if (currentKey) {
    // Hide sign-in and sign-up buttons
    signIn.style.display = "none";
    tagLineSignUp.style.display = "none";
    bookMarkPage.style.display = 'inline-block';
   
    let verifiedUser = checkForUser(); 
    // console.log(verifiedUser);

    // Display the user's name and sign-out button
    signUp.innerHTML = `${verifiedUser.username}<i class="fa fa-user red"></i>`;
    signUp.style.display = "inline-block";
    logOutIcon.style.display = "inline-block";
    logOutIcon.style.margin = "10px";


    document.querySelector(".profile").href = "Profile-Page.html";
  } else {
    // If user is not logged in, show the sign-in and sign-up buttons
    signIn.style.display = "inline-block";
    tagLineSignUp.style.display = "inline-block";
    bookMarkPage.style.display = 'none';
  
  }
}

function logOut(e) {
  e.preventDefault();

  // Clear the user-related elements
  let signIn = document.querySelector(".sign-in");
  let tagLineSignUp = document.querySelector(".Get-Started1");
  let signUp = document.querySelector(".Get-Started");
  signUp.innerHTML = "";
  localStorage.removeItem('loggedIn');


  // Replace user-related elements to default elements

  signIn.style.display = "inline-block";
  tagLineSignUp.style.display = "inline-block";
  signOut.style.display = "none";
  signUp.innerHTML = "<button>Get Started</button>";

  document.querySelector(".profile").href = "Get_started.html";

 

  // Redirect to the homepage or any other page you prefer
  // window.location.href = "index.html";
}

window.onload = function () {
  checkLoginStatus();
  
};

function generateUniqueId() {
  // Create a unique identifier using a timestamp and a random number
  const timestamp = new Date().getTime(); // Current timestamp
  const random = Math.floor(Math.random() * 10000); // Random number between 0 and 9999

  // Combine the timestamp and random number to create a unique identifier
  const uniqueId = `${timestamp}-${random}`;

  return uniqueId;
}





