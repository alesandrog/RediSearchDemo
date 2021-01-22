const searchbox = document.getElementById('searchbox');
const list = document.getElementById('result_list');
const placeholderBox = document.getElementById('searchbox2');
//const suggestbox = document.getElementById('suggestbox');
//const suggest_list = document.getElementById('suggest_list');
//const navSug = document.getElementById('nav-suggestion-list');



const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

async function search(){
    const suggestion = await fetch(`http://localhost:5000/autocomplete/${searchbox.value != '' ? searchbox.value : ' '}`, options);
    const suggJson = await suggestion.json();
    placeholderBox.placeholder = suggJson.data[0];
    console.log(suggJson.data[0])

    const data = await fetch(`http://localhost:5000/search/${searchbox.value}`, options);
    const json = await data.json();
    list.innerHTML = '';
    let newInner = '';
    for(let document of json.data){
        newInner += listElement(document);
    }
    list.innerHTML = newInner;
}
/*
async function suggest(){
    console.log(suggestbox.value)
    const data = await fetch(`http://localhost:5000/autocomplete/${suggestbox.value != '' ? suggestbox.value : ' '}`, options);
    const json = await data.json();
    suggest_list.innerHTML = '';
    let newInner = '';
    for(let document of json.data){
        newInner += suggestionCard(document)
    }
    suggest_list.innerHTML = newInner;
}*/

function listElement(user){
    return `
    <li> ${user.name} </li>
    `;
}

function card(user){
    return `
    <div class="userCard">
        <h3>${user.name}</h3>
        <div class="userSubInfo">
            <h6>${user.username}</h6>
            <h6>${user.age}</h6>
        </div>
    </div>
    `
}

function suggestionCard(user){
    return `
    <div class="userCard">
        <h3>${user}</h3>
        <div class="userSubInfo">
            <h6> </h6>
            <h6> </h6>
        </div>
    </div>
    `
}