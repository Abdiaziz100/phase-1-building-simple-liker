// Initial hidden state for error modal
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");

  const hearts = document.querySelectorAll(".like-glyph");
  hearts.forEach(heart => {
    heart.addEventListener("click", () => {
      mimicServerCall()
        .then(() => {
          if (heart.textContent === "♡") {
            heart.textContent = "♥";
            heart.classList.add("activated-heart");
          } else {
            heart.textContent = "♡";
            heart.classList.remove("activated-heart");
          }
        })
        .catch(error => {
          modal.classList.remove("hidden");
          document.getElementById("modal-message").textContent = error;
          setTimeout(() => modal.classList.add("hidden"), 3000);
        });
    });
  });
});

// Provided function that mocks a server call
function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      const isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
