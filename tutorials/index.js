const url = new URL(document.location.href);
const params = new URLSearchParams(url.search);

const id = params.get("id");

if (id){
    fetch("data.json")
    .then(response => response.json())
    .then(data => {
        if (data[id] !== undefined){
            console.log("Loading tutorial data")
            const tutorialdata = data[id];
            document.title = `Title #${id}`
            const content = document.querySelector(".content")
            if (tutorialdata){
                console.log("Generating.")
                tutorialdata.forEach(element => {
                    const newelement = document.createElement(element.type);
                    content.appendChild(newelement);
                    newelement.innerHTML = element.text;
                    if (element.href){
                        newelement.href = element.href;
                    }
                });
            }
        }else{
            console.log("Invalid id/Data not found.")
        }
    })
}else{
    console.log("Invalid Id/Not found.")
}