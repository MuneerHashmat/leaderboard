let leaderBoardArray = [
    { name: "Virat Kohli", country: "India", score: 86, time: "09 Mar 2024 07:34am" },
    { name: "Babar Azam", country: "Pakistan", score: 78, time: "11 Mar 2024 05:45am" },
    { name: "Steve Smith", country: "Australia", score: 32, time: "12 Mar 2024 09:12am" },
];




let addPlayer = document.getElementById("add-player");
addPlayer.addEventListener("click", (e) => {
    e.preventDefault();
    let nameElement = document.getElementById("name");
    let countryElement = document.getElementById("country");
    let scoreElemnt = document.getElementById("score");

    let nameValue = nameElement.value;
    let countryValue = countryElement.value;
    let scoreValue = parseInt(scoreElemnt.value);

    if (nameValue == "" || countryValue == "" || isNaN(scoreValue)) {
        alert("all fields are required!");
        return;
    }

    if (scoreValue < 0 || isNaN(scoreValue)) {
        alert("please enter a valid score!");
        return;
    }


    let timeStamp = getTimeStamp();

    let playerObj = {
        name: nameValue,
        country: countryValue,
        score: scoreValue,
        time: timeStamp,
    };


    leaderBoardArray.push(playerObj);
    console.log(leaderBoardArray);
    sortLeaderBoard();
    displayData();

    nameElement.value = "";
    countryElement.value = "";
    scoreElemnt.value = "";
});

window.addEventListener("load", displayData());//display data when page loads

function displayData() {
    let dataContainer = document.getElementById("data-container");
    dataContainer.innerHTML = "";

    for (let index = 0; index < leaderBoardArray.length; index++) {
        let player = leaderBoardArray[index];
        let newDiv = document.createElement("div");
        newDiv.classList.add("data-item");
        newDiv.innerHTML = `
                            <p id="p-name">${player.name}<br><span>${player.time}</span></p>
                            <p id="p-country">${player.country}</p>
                            <p id="pscore">${player.score}</p>
                            <p id="ptime"></p>
                            <p>
                                <button onclick="deleteRow(${index})"><i class="fi fi-rr-trash"></i></button>
                                <button  onclick="updateScore(${index}, 5)">+5</button>
                                <button onclick="updateScore(${index}, -5)">-5</button>
                            </p>
                        `;
        dataContainer.appendChild(newDiv);
    }
}

//adding leaderboard entry


//get current date and time
function getTimeStamp() {
    let now = new Date();
    let day = now.getDate();
    let monthName = now.toLocaleDateString('en-US', { month: 'short' });
    let year = now.getFullYear();
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let meridiem = now.getHours() >= 12 ? 'pm' : 'am';
    let hour12 = now.getHours() % 12 || 12;

    return `${day} ${monthName} ${year} ${hour12}:${minutes}${meridiem}`;
}

function sortLeaderBoard() {
    leaderBoardArray.sort((a, b) => b.score - a.score);
}

function deleteRow(index) {
    leaderBoardArray.splice(index, 1);
    sortLeaderBoard();
    displayData();
}

function updateScore(index, value) {
    let player = leaderBoardArray[index];
    player.score += value;
    if (player.score < 0) {
        player.score = 0;
    }
    else {
        player.time = getTimeStamp();
    }
    sortLeaderBoard();
    displayData();
}












