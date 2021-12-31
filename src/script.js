function apiCall() {
    var username = document.getElementById("username").value.trim();
    var xmlreq = new XMLHttpRequest();
    var url = "https://api.github.com/users/" + username;
    getRepos(url + "/repos");
    xmlreq.onload = ()=>{
        renderData(xmlreq.response);
    }
    xmlreq.open("GET", url);
    xmlreq.send();
}

function getRepos(url) {
    var xmlreq2 = new XMLHttpRequest();
    xmlreq2.onload = ()=> {
        renderRepos(xmlreq2.response);
    }
    xmlreq2.open("GET", url);
    xmlreq2.send();
}

function renderData(data) {  
    var data = JSON.parse(data);
    console.log(data);
    if(data.message) {
        document.getElementById("user-data").style.display = "none";
        document.getElementById("failed-request").style.display = "block";
        document.getElementById("error").innerText = data.message;
    } else {
        document.getElementById("user-data").style.display = "block";
        document.getElementById("failed-request").style.display = "none";
        document.getElementById("displayname").innerText = data.name;
        document.getElementById("handle").innerHTML = "<em>(@<a style='text-decoration:none' href=" + data.html_url +" target='_blank' rel='noopener noreferrer'>" + data.login + "</a>)</em>";
        document.getElementById("userimage").src = data.avatar_url;
        document.getElementById("followersNum").innerText = data.followers;
        document.getElementById("followingNum").innerText = data.following;
    }
}

function renderRepos(data) {
    var data = JSON.parse(data);
    console.log(data);
    clearRepoData();
    document.getElementById("repoNum").innerText = data.length;
    var listParent = document.getElementById("repo-list");
    data.forEach((element)=> {
        var listNode = document.createElement("button");
        listNode.addEventListener("click", ()=>{
            window.open(element.html_url);
        })
        listNode.innerText = element.name;
        listParent.appendChild(listNode);
    })
}

function clearRepoData() {
    var parent = document.getElementById("repo-list");
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}