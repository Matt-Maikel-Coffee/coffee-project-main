"use strict"

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

function renderCoffee(coffee) {
    let html = '<div class="coffee col-6 col-md-4 text-center bg-secondary text-light opacity-75">';
    // html += '<div>' + coffee.id + '</div>';
    html += '<div class="coffees"><h2 class="w-100">' + coffee.name + '</h2></div>';
    html += '<div><p class="text-white">' + coffee.roast + '</p></div>';
    html += '</div>';
    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for (let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    } return html;
}

function updateCoffees(e) {
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        } else if (selectedRoast === 'all roasts') {
            filteredCoffees.push(coffee);
        }
    });
    let done = document.getElementById('coffees')
    done.innerHTML = renderCoffees(filteredCoffees);
}

//search_coffee Function
function search_coffee() {
    let input = document.getElementById('searchbar').value;
    input = input.toLowerCase();
    let filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.name.toLowerCase().includes(input)) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

let searchBar = document.querySelector('#searchbar');
searchBar.addEventListener('keyup', search_coffee);

//add_coffee Function
function add_Coffee (input) {
    let addRoast = addCoffee.value.toString()
    console.log(addRoast);
    let addCoffees = coffeeAdd.value.toString()
    let addId = coffees.length+1
    input = {id: addId, name: addCoffees, roast: addRoast}
    if (input.name === "") {
    } else {
        coffees.push(input)
        tbody.innerHTML = renderCoffees(coffees)
        window.localStorage.setItem('coffees', JSON.stringify(coffees))
        console.log(window.localStorage.getItem('coffees'))
    }
}

let coffeeAdd = document.querySelector('#coffee-add')
let addCoffee = document.querySelector('#add-coffee')
let submit = document.getElementById('sub');
submit.addEventListener('click', add_Coffee);

let tbody = document.querySelector('#coffees');
let roastSelection = document.querySelector('#roast-selection');

if (window.localStorage.getItem('coffees')) {
    let it = window.localStorage.getItem('coffees')
    coffees = JSON.parse(it)
    tbody.innerHTML = renderCoffees(coffees);
} else {
    tbody.innerHTML = renderCoffees(coffees);
}

roastSelection.addEventListener('change', updateCoffees);

window.onbeforeunload = window.localStorage.clear();
