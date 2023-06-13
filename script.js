const profilediv = document.querySelector("#result");
const search = document.querySelector("#search_bar");
const sub_btn = document.querySelector(".sub_btn");
const repodiv = document.querySelector("#repos");
window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("https://api.github.com/users/nithishrcta");
        const data = await response.json();
        showprofile(data);
        showrepos("nithishrcta");
    }
    catch (error) {
        console.log(error);
        alert("An error occured while fetching data from server.");
    }
});

sub_btn.addEventListener("click", () => {
    var text = search.value;
    searchProfile(text);
    showrepos(text);
});

const searchProfile = async (text) => {
    try {
        const response = await fetch(`https://api.github.com/users/${text}`);
        const data = await response.json();
        showprofile(data);
    }
    catch (error) {
        console.log(error);
        alert("An error occured while fetching data from server.");
    }
}

function showprofile(data) {
    console.log(data);
    profilediv.innerHTML = `
            <div class= "text-center mx-auto" >
            <img class="w-72 rounded-2xl mx-auto" src="${data.avatar_url}">
                <h1 class="text-3xl font-semibold mt-5">${data.name}</h1 >
                <div class="sm: mx-[2rem] lg:mx-[30rem]">
                <p class="mt-2">${data.bio}</p >
                </div>
                <div class="flex justify-center gap-4 mt-5">
                <p class="bg-black text-white p-3 font-semibold rounded">Followers : ${data.followers}</p >
                <p class="bg-black text-white p-3 font-semibold rounded">Following : ${data.following}</p >
                </div>
                <div class="flex justify-center">
                <p class="text-[1.2rem] bg-black text-white p-3 font-semibold rounded-lg mt-5 w-[17rem]"><a href="${data.html_url}">Visit Profile <i class="ml-1 fa-brands fa-github" style="color: #ffffff;"></i></a></p>
                </div>
                <p class="pt-3 text-xl font-semibold" > Total Repository: ${data.public_repos}</p >
            </div >
        `;
}

const showrepos = async (text) => {
    try {
        const response = await fetch(`https://api.github.com/users/${text}/repos`);
        const data = await response.json();
        let repos = [...data];
        console.log(repos[0]);
        const renderrepo = () => {
            repodiv.innerHTML = "";
            for (let i = 0; i < repos.length; i++) {
                repodiv.innerHTML += ` <div class="repo bg-black px-10 rounded-xl w-[22rem] flex flex-col text-center justify-between"> 
                    <div class="flex flex-col items-center">
                    <img class="w-40 mt-5" src="./Assests/repo_img.png"></img>
                    <p class="text-white mt-4 font-semibold mb-8">${repos[i].name}</p>
                    </div >
            <div>
            <div class="flex justify-between text-white pb-4">
            <div class="flex  gap-2">
            <i class="fa-solid fa-eye text-white my-auto"></i><p>${repos[i].visibility}</p>
            </div>
            <div class="flex flex-row gap-2">
            <p>${repos[i].forks_count}</p><i class="fa-solid fa-code-fork my-auto"></i>
            </div>
            </div >
            <button class="bg-white p-[0.5rem] rounded text-[0.8rem] px-5 mb-5 mt-3"><a href=${repos[i].html_url}><i class="fa-solid fa-link"></i>  Repo Link</a ></button >
            </div>
            </div > `;
            }
        }
        renderrepo();
    }
    catch (error) {
        console.log(error);
        alert("An error occured while fetching data from server.");
    }
}