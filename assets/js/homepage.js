var userFormE1 = document.querySelector("#user-form");
var nameInputE1 = document.querySelector("#username");
var repoContainerE1 = document.querySelector("#repos-container");
var repoSerchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event) {
    event.preventDefault();

    var username = nameInputE1.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputE1.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
    console.log(event);
};

var getUserRepos = function(user){
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl).then(function(response){
        if (response.ok){
        response.json().then(function(data){
            displayRepos(data, user);
        });
    } else {
        alert("Error: GitHub User Not Found");
    }
    });
};

var displayRepos = function(repos, serchTerm) {
    if (repos.length === 0) {
        repoContainerE1.textContent = "No repositories found.";
        return;
    }
    
    console.log(repos);
    console.log(serchTerm);

    repoContainerE1.textContent = "";
    repoSerchTerm.textContent = serchTerm;

    for (var i = 0; i < repos.length; i++){
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        var repoE1 = document.createElement("div");
        repoE1.classList = "list-item flex-row justify-space-between align-center";

        var titleE1 = document.createElement("span");
        titleE1.textContent = repoName;

        var statusE1 = document.createElement("span");
        statusE1.classList = "flex-row align-center";

        if(repos[i].open_issues_count > 0) {
            statusE1.innerHTML = 
            "<i class ='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + "issue(s)";
        } else {
            statusE1.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>"
        }
        

        repoE1.appendChild(titleE1);
repoE1.appendChild(statusE1);
        repoContainerE1.appendChild(repoE1)
    }
}
userFormE1.addEventListener("submit", formSubmitHandler);