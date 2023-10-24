let userIsSignnedIn;
userIsSignnedIn = localStorage.getItem('loggedIn');

let applyBtn = document.querySelector('.apply-button');
applyBtn.addEventListener('click', showForm);

let closeForm = document.querySelector('.closebtn');
closeForm.addEventListener('click', hideForm);

 let redirectToSignIn = document.querySelector('.redirect-to-sign-in');


function showForm(message){

  let write4UsForm = document.getElementById('apply-form');

   write4UsForm.className = "show";

  
}

function hideForm(){
  let write4UsForm = document.getElementById('apply-form');
  write4UsForm.classList.remove('show');

}



 if(userIsSignnedIn){

  applyBtn.style.display = 'inline-block';
}
else
{

  applyBtn.style.display = 'none';
  redirectToSignIn.innerHTML = `<p>Please Sign Up <a href = "Get_started.html"> Here </a> </p>`;
 
}

