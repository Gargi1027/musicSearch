//Element Grabs
let container = document.querySelector(".container")
let inputElement = document.getElementById("myInput");
let submitElement = document.getElementById("mySubmit");

//set event listener to trigger search only after 'enter' is pressed.
submitElement.addEventListener("click", function(event) {
    //clear screen for every new search
    container.innerHTML="";
    fetchStuff();
});

//fetch
function fetchStuff() {
  let url="https://itunes.apple.com/search?term=";
  let inputValue= inputElement.value;
  fetch(url + inputValue)
      .then(function(response) {
          if (response.status !== 200) {
            return;
          }

          //successful fetch function
          response.json().then(function(data){
            for (i in data.results){
              addInfo(data.results[i]);
              }
              function addInfo(info){
                let returnResponse = document.createElement("div");
                returnResponse.addEventListener('click', function(e) {
                    let songUrl=info.previewUrl;
                    let player=document.getElementById("audio");
                    player.setAttribute('src',songUrl);
                    player.play();
                    console.log(songUrl);
                    });
                 returnResponse.innerHTML = `
                 <p></p>
                 <img src="http://via.placeholder.com/100" alt="Image Missing">
                   <p><span>Artist:</span>${info.artistName}</p>
                   <p><span>Song:</span>${info.trackName}</p>
                 `;
                 container.appendChild(returnResponse);
              }
            console.log(data);
          });
        }
      )
      //error
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
}
