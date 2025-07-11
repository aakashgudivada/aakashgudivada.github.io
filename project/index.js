const url = new URL(document.location.href);
const params = new URLSearchParams(url.search);

const id = params.get("id");
const content = document.querySelector(".content")

const loading = document.getElementById("loading");
const view = document.getElementById("view")

content.style.display = "none"
loading.style.display = "flex"

if (id){
    fetch("/projectdata.json")
    .then(response => response.json())
    .then(data => {
        if (data[id] !== undefined){
            document.title = `Project #${id}`
            console.log("Loading tutorial data");
            const projectdata = data[id]
            const des = document.getElementById("description")
            const title = document.getElementById("heading");
            const tags = document.getElementById("tags");
            const langs = document.getElementById("languages");
            title.textContent = projectdata["title"];
            des.innerHTML = `${projectdata.description}<br><br>Id: ${id}*<br>Uploaded on ${projectdata.date || "10th July 2025"}.*`
            projectdata.tags.forEach(element => {
                const newtag = document.createElement("li")
                newtag.textContent = "#" + element
                tags.appendChild(newtag)
            });
            projectdata.languages.forEach(element => {
                const newtag = document.createElement("li")
                newtag.textContent = element
                langs.appendChild(newtag)
            });
            setTimeout(() => {
                loading.style.display = "none";
                content.style.display = "flex";
            }, 1500);
            view.addEventListener("click",function(){
                document.location.href = projectdata["link"];
                return
            })
        }else{
            console.log("Invalid id/Data not found.")
        }
    })
}