function checkPassword() {
    password = document.getElementById("password");
    outcome = document.getElementById("outcome");
    
    if (password.value == "oog-booga") {
      outcome.innerHTML = "Successfully logged in.";
      window.location.href = "mainPage/mainPage.html";
    } else {
      outcome.innerHTML = "Password is incorrect.";
    }
  }