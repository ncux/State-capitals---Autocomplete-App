const searchInput = document.querySelector('#search');
const matchResults = document.querySelector('#match-results');

searchInput.addEventListener('keyup', () => searchStates(searchInput.value));

// searches and filters the json file
async function searchStates(query) {
    const response = await fetch('./data/state_capitals.json');
    const states = await response.json();
    // console.log(states);
    // get matches to current query
    let matches = states.filter(state => {
        const regex = new RegExp(`^${query}`, `gi`);
        return state.name.match(regex) || state.abbr.match(regex)
    });
    
    if(query.length == 0) {
        matches = [];
        matchResults.innerHTML = '';
    }
    console.log(matches);
    
    displayMatches(matches);
}

function displayMatches(matches) {
    if(matches.length > 0) {
        matches.forEach(match => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('mb-3');
            const p = document.createElement('p');
            p.innerHTML = `<span class="text-secondary">Name: </span> <span class="text-primary">${match.name}</span>`;
            const p1 = document.createElement('p');
            p1.innerHTML = `<span class="text-secondary">Abbreviation: </span> <span class="text-primary">${match.abbr}</span>`;
            const p2 = document.createElement('p');
            p2.innerHTML = `<span class="text-secondary">Capital: </span> <span class="text-primary">${match.capital}</span>`;
            card.append(p, p1, p2);
            matchResults.append(card);
        });

    }
}