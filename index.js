const searchbox = document.getElementById('searchbox');
const list = document.getElementById('result_list');

const suggestbox = document.getElementById('suggestbox');
const suggest_list = document.getElementById('suggest_list');

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

async function search(){
    const data = await fetch(`http://localhost:5000/search/${searchbox.value}`, options);
    const json = await data.json();
    list.innerHTML = '';
    let newInner = '';
    for(let document of json.data){
        newInner += card(document)
    }
    list.innerHTML = newInner;
}

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