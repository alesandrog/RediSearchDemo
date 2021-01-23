/**
 * Inputs
 */
const searchbox = document.getElementById('searchbox');
const userInput = document.getElementById('userInput');
const nameInput = document.getElementById('nameInput');
const ageInput = document.getElementById('ageInput');

/**
 * DOM elements
 */

const list = document.getElementById('result_list');
const placeholderBox = document.getElementById('searchbox2');
const userRead = document.getElementById('userRead');
const nameRead = document.getElementById('nameRead');
const ageRead = document.getElementById('ageRead');

/**
 * HTTP Options
 */

const GEToptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

const POSToptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body:{}
};

/**
 * @method search
 * Sends a request to search the specified value in the Redis database
 */

async function search(){
    if(searchbox.value == ''){
        placeholderBox.placeholder = '';
        return;
    }
    const suggestion = await fetch(`http://localhost:5000/autocomplete/${searchbox.value}`, GEToptions);
    const suggJson = await suggestion.json();
    placeholderBox.placeholder = suggJson.data[0] != undefined ? suggJson.data[0] : '';

    const data = await fetch(`http://localhost:5000/search/${searchbox.value}`, GEToptions);
    const json = await data.json();
    list.innerHTML = '';
    let newInner = '';
    for(let document of json.data){
        newInner += listElement(document);
    }
    list.innerHTML = newInner;

    var results = document.getElementsByClassName('list_el');
    for (var i = 0; i < results.length; i++) {
        console.log(results[i].id)
        results[i].addEventListener('click', setUserData.bind(results[i], results[i].id));
    }
}

/**
 * @method setUserData
 * Sends a request to get user complete data
 * @param {string} userId 
 */

async function setUserData(userId){
    const data = await fetch(`http://localhost:5000/search/${userId}`, GEToptions);
    const json = await data.json();
    const user = json.data[0];
    userRead.placeholder = user.username;
    nameRead.placeholder = user.name;
    ageRead.placeholder = user.age;
}

/**
 * @function listElement
 * @param {Object} user 
 * @returns {string} list html element
 */

function listElement(user){
    return `
    <li id="${user.username}" class="list_el">@${user.username} | ${user.name} </li>
    `;
}

/**
 * @method addUser
 * Sends a POST request to save a new user in the Redis database
 */

async function addUser(){
    const user = {
        username:userInput.value,
        name:nameInput.value,
        age:ageInput.value
    }
    POSToptions.body = JSON.stringify(user);
    await fetch(`http://localhost:5000/add`, POSToptions);
    alert('user added');

    userInput.value = '';
    nameInput.value = '';
    ageInput.value = '';
}

