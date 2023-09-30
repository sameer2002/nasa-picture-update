//zBUnLz4fmDgn2zTLMcFGqAttbex86vgez1A0Hu9L
const API_KEY=`zBUnLz4fmDgn2zTLMcFGqAttbex86vgez1A0Hu9L`;

const baseurl=`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;




document.addEventListener('DOMContentLoaded', () => {
    getCurrentImageOfTheDay();
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedDate = document.getElementById('search-input').value;
        getImageOfTheDay(selectedDate);
    });

    document.getElementById('search-history').addEventListener('click', function(event) {
        if (event.target && event.target.nodeName === 'LI') {
            getImageOfTheDay(event.target.textContent);
        }
    });
});

async function getCurrentImageOfTheDay() {
    try {
        let url=baseurl;
        const response = await fetch(url);
        const result = await response.json();
        displayPicture(result);
    } catch (error) {
        console.error('Failed to fetch and render', error);
    }
}

async function getImageOfTheDay(date) {
    try {
        let url=`${baseurl}&date=${date}`
        const response = await fetch(url);
        const result = await response.json();
        displayPicture(result);
        console.log(result)
        saveSearch(date);
        addSearchToHistory(date);
    } catch (error) {
        console.error('Failed to fetch and render', error);
    }
}


function displayPicture(data) {
    const container = document.getElementById('current-image-container');
    const today = new Date().toISOString().split('T')[0];  // Gets the current date in YYYY-MM-DD format
    const title = (data.date === today) ? "NASA Picture of the Day" : "Picture On " + data.date;

    container.innerHTML = `
        <h1>${title}</h1>
        <img src="${data.url}" alt="${data.title}">
        <h4>${data.title}</h4>
        <p>${data.explanation}</p>
    `;
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
}

function addSearchToHistory(date) {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    const ul = document.getElementById('search-history');
    ul.innerHTML = ''; 
    searches.forEach(search => {
        ul.innerHTML += `<li>${search}</li>`;
    });
}





