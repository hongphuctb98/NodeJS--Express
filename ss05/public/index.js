const questionContent = document.querySelector(".question-content");
const dislikeBtn = document.querySelector("#dislike");
const likeBtn = document.querySelector("#like");

dislikeBtn.addEventListener("click", sendDatatoServer("dislike"));
likeBtn.addEventListener("click", sendDatatoServer("like"));

function sendDatatoServer(type) {}
const question = fetch("http://localhost:3010/api/v1/questions")
  .then((res) => res.json())
  .then((data) => {
    let rdn = Math.floor(Math.random() * data.length);
    questionContent.innerHTML = data[rdn].content;
    // return data;
  })
  .catch((err) => {
    console.log(err);
  });
