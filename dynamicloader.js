let projects = [];
let projectdata = null;

let current = null;
const imgdict = {
    "JavaScript": "/Images/Icons/js.png",
    "Lua": "/Images/Icons/Lua-Logo.svg.png",
    "C": "/Images/Icons/c.svg",
    "C++": "/Images/Icons/c-.png",
    "HTML & CSS": "/Images/Icons/html-5.png",
    "node.js": "/Images/Icons/node-js.png",
    "3D Modelling": "/Images/Icons/blender-3d.png",
    "UI/UX": "/Images/Icons/programming.png",
    "UI": "/Images/Icons/programming.png",
    "NoSQL": "/Images/Icons/server.png",
    "SQL": "/Images/Icons/server.png",
    "Game": "/Images/Icons/joystick.png",
    "Hardware": "/Images/Icons/cpu.png",
    "AIML": "/Images/Icons/deep-learning.png",
    "Networking/Operations": "/Images/Icons/networking.png"
}

const errormsg = document.querySelector(".msg");
const msg = document.getElementById("errormsg")

function showerror(text){
    if (!text) return;
    errormsg.style.display = "flex"
    msg.innerHTML = text;
    setTimeout(() => {
        errormsg.style.display = "none"
    }, 4000);
    return;
}

const des1 = document.getElementById("des1");

fetch("projectdata.json")
.then(response => response.json())
.then(data => {
    projectdata = data;
    const length = Object.keys(data).length || 0;
    //des1.innerHTML = des1.innerHTML + ` [${length}].`
    const container = document.getElementById("projectlist");
    Object.entries(data).forEach(([id,projectdata]) => {
        const projectelement = document.createElement("li");
        projectelement.id = "project";
        container.appendChild(projectelement);
        const newimg = document.createElement("img");
        newimg.src = projectdata.icon;
        newimg.id = "icon"
        projectelement.appendChild(newimg)

        const h1 = document.createElement("h1");
        h1.textContent = projectdata.title;
        projectelement.appendChild(h1)

        const button = document.createElement("button");
        button.textContent = "VIEW"
        projectelement.appendChild(button);

        const tagscontainer = document.createElement("ul");
        projectelement.appendChild(tagscontainer);
        tagscontainer.className = "tags";
        if (projectdata.tags.length > 0){
            projectdata.tags.forEach(tag =>{
                const newtag = document.createElement("li");
                newtag.textContent = "#" + tag
                tagscontainer.appendChild(newtag)
            })
        }
        projects[id] = projectelement;

        const label = document.createElement("h3");
        label.textContent = "TECHSTACK";
        label.id = "labelp"
        projectelement.appendChild(label)

        const ts = document.createElement("ul");
        projectelement.appendChild(ts);
        ts.className = "ts"

        projectdata.languages.forEach(lg =>{
            const newel = document.createElement("li")
            ts.appendChild(newel);
            const img = imgdict[lg]
            const newimg = document.createElement("img");
            newimg.src = img;
            newimg.id = "tsi"
            newel.appendChild(newimg);
            const newtitle = document.createElement("h3");
            newel.appendChild(newtitle);
            newtitle.textContent = lg
        })

        button.addEventListener("click",function(){
            if (projectdata.link === ""){
                showerror("This project is proprietory only!")
            }else{
                window.open(`/project/?id=${id}`);
            }
            return;
        })
    });
    return
})

const fb = document.querySelectorAll("#filters li");
const none = document.getElementById("none");

fb.forEach(button =>{
    button.addEventListener("click",function(){
        if (current !== null){
            current.style.backgroundColor = "rgb(245,245,245)"
        }
        current = button;
        button.style.backgroundColor = "rgb(235,235,235)"
        const p1 = button.querySelector("p1");
        const targetSearch = p1.textContent;
        if (!projectdata) return;
        let count = 0
        none.style.display = "none";
        Object.entries(projectdata).forEach(([id,data]) => {
            if (data.languages.includes(targetSearch)){
                projects[id].style.display = "flex"
                count += 1;
            }else{
                projects[id].style.display = "none"
            }
        })
        if (count === 0){
            none.style.display = "flex"
        }
    })
})