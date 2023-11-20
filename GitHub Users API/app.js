const githubForm=document.getElementById("github-form")
const nameInput=document.getElementById("githubname")
const clearLastUsers=document.getElementById("clear-last-users")
const lastUsers=document.getElementById("last-users")
const github=new Github()
const uii=new UII()


eventListeners()

function eventListeners(){
    githubForm.addEventListener("submit",getData)
    clearLastUsers.addEventListener("click",clearAllSearched)
    document.addEventListener("DOMContentLoaded",getAllSearched)
}

function getData(e){
    let username=nameInput.value.trim()
    if(username===""){
        alert("Lütfen geçerli bir kullanıcı adı girin")
    }
    else{
        github.getGithubData(username)
        .then(response=>{
            if(response.user.message==="Not Found"){
                uii.showError("Kullanıcı bulunamadı")
            }else{
                uii.addSearchedUserToUI(username)
                Storage.addSearchedUserToStorage(username)
                uii.showUserInfo(response.user)
                uii.showRepoInfo(response.repo)
            }
        })
        .catch(err=>uii.showError(err))
    }

    uii.clearInput()

    e.preventDefault()
}
function clearAllSearched(){
    if(confirm("Emin misiniz?")){
        Storage.clearAllSearchedUsersFromStorage()
        uii.clearAllSearchedFromUI()
    }

}
function getAllSearched(){
    let users=Storage.getSearhedUsersFromStorage()
    let result=""
    users.forEach(user => {
        result+=`  <li class="list-group-item">${user}</li>`
    });
    lastUsers.innerHTML=result
}