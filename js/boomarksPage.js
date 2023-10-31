let currentUser;
let logOutIcon = document.getElementById("So");
let signOut = document.querySelector(".logout");
let bookmarkedDb = JSON.parse(localStorage.getItem("bookmarks")) || [];
let postTitle = document.querySelector(".post-title");
let postVisual = document.querySelector(".post-visual");
let postExcerpt = document.querySelector(".post-excerpt");

signOut.addEventListener("click", logOut);

function toSinglePost() {
  window.location.href = "Single-Post.html";
}

function checkLoginStatus() {
  const allUsers = JSON.parse(localStorage.getItem("database"));
  let activeUser = localStorage.getItem("activeuser");

  function checkForUser() {
    for (let i = 0; i < allUsers.length; i++) {
      currentUser = allUsers[i];

      if (currentUser.username == activeUser) {
        return currentUser;
      }
    }
  }

  let currentKey = localStorage.getItem("loggedIn");
  let signUp = document.querySelector(".Get-Started");

  if (currentKey) {
    let verifiedUser = checkForUser();
    // console.log(verifiedUser);

    // Display the user's name and sign-out button
    signUp.innerHTML = `${verifiedUser.username}<i class="fa fa-user red"></i>`;
    // signUp.style.color = 'white';
    signUp.style.display = "inline-block";
    logOutIcon.style.display = "inline-block";
    logOutIcon.style.margin = "10px";
    document.querySelector(".profile").href = "Profile-Page.html";
  }
 
}

function logOut(e) {
  e.preventDefault();

  // Clear the user-related elements
  let signUp = document.querySelector(".Get-Started");
  signUp.innerHTML = "";
  localStorage.removeItem("loggedIn");

  // Replace user-related elements to default elements

  signOut.style.display = "none";
  signUp.innerHTML = "<button>Get Started</button>";

  document.querySelector(".profile").href = "Get_started.html";

  // Redirect to the homepage or any other page you prefer
  window.location.href = "index.html";
}

window.onload = function () {
  checkLoginStatus();
  loadBookmarksDb();
};

function loadBookmarksDb() {
  const bookmarksContainer = document.querySelector(".bookmarks-cont");

  const noBookmarksMessage = document.getElementById("noBookmarksMessage");

 
  // Clear existing content in the container
  bookmarksContainer.innerHTML = "";

  if (bookmarkedDb.length === 0) {
        noBookmarksMessage.innerText = 'No bookmarked post yet';
        

      } else {
        noBookmarksMessage.innerText = '';
      }
    

  for (let i = 0; i < bookmarkedDb.length; i++) {
    const bookmark = bookmarkedDb[i];

    const bookmarkItem = document.createElement("div");
    bookmarkItem.classList.add("loaded-bookmark");

    const postVisual = document.createElement("div");
    postVisual.classList.add("post-visual");
    postVisual.innerHTML = bookmark.postVisual;

    const postTitle = document.createElement("div");
    postTitle.classList.add("post-title");
    postTitle.innerText = bookmark.postTitle;

    const tNe = document.createElement("div");
    tNe.classList.add("t-e");
    tNe.addEventListener("click", toSinglePost);

    const postExcerpt = document.createElement("div");
    postExcerpt.classList.add("post-excerpt");
    postExcerpt.innerText = bookmark.postExcerpt.split(/[.!?]/).slice(0,1).join('.');

    const rmBookmark = document.createElement('div');
    rmBookmark.classList.add("rm-bookmark");
    rmBookmark.innerHTML = `<span class="material-symbols-outlined delete" data-index="${i}">delete_forever</span>`;

    rmBookmark.addEventListener('click', function() {
      

       // Get the index of the bookmark to be deleted from the data attribute
  const deleteIndex = parseInt(this.querySelector('.delete').getAttribute('data-index'), 10);

  // Remove the corresponding bookmark from the array
  bookmarkedDb.splice(deleteIndex, 1);

  // Update local storage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkedDb));

  // Remove the deleted bookmark element from the DOM
  const bookmarkItem = this.parentElement;
  bookmarksContainer.removeChild(bookmarkItem);

  loadBookmarksDb();

      


      
    });

    tNe.appendChild(postTitle);
    tNe.appendChild(postExcerpt);

    bookmarkItem.appendChild(postVisual);
    bookmarkItem.appendChild(tNe);
    bookmarkItem.appendChild(rmBookmark);

    bookmarksContainer.appendChild(bookmarkItem);
  }
}















