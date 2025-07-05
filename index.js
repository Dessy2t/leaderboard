let form = document.getElementById("form")
let inputUser = document.querySelector("input[name='user']")
let inputScore = document.querySelector("input[name='score']");
let noticeTag = document.querySelector('#notice')
let refreshBtn = document.querySelector('#refresh_btn');
let output = document.querySelector('ul')
let SCORES_URL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Zl4d7IVkemOTTVg2fUdz/scores/`;

let displayScores = (scores) => {
  let { result } = scores;
  result?.slice(4430).map((result) => {
    let {score, user} = result
    let li = `<li>${user} : ${String(score).slice(0, 3)} </li>`;
    output.insertAdjacentHTML('beforeend',li )
  });
}

async function retrieveScore(url) {
  let apiResponse = await fetch(url);
  let data = await apiResponse.json()
  return data
}

let results =  await retrieveScore(SCORES_URL);
displayScores(results);

refreshBtn.addEventListener('click', async() => {
  let results =  await retrieveScore(SCORES_URL);
  displayScores(results);
});


form.addEventListener("submit", function(event){
  event.preventDefault()
  let data = {
    user: inputUser.value,
    score: inputScore.value,
  }

  fetch(SCORES_URL, {
    method: this.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        noticeTag.textContent = response;
      }
      return response.json();
    })
    .then((outcome) => {
      let { result } = outcome;
      noticeTag.textContent = result;
    });
})
