//initial Refrences
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
const input = document.querySelector("#movie-name");

//function to fetch data from api
input.value = "";

let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  // if field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `< h3 class = "msg" > Please Enter a Movie Name < /h3>`;
  }

  //if input field is not empty
  else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        console.log(data.Poster);
        console.log(data.Title);
        console.log(data.imdbRating);
        console.log(data.Rated);
        console.log(data.Year);
        console.log(data.Runtine);
        console.log(data.Genre);
        console.log(data.Plot);
        console.log(data.Actors);

        //if movie exists in database
        if (data.Response == "True") {
          result.innerHTML = `
                    <div class="info">
                        <img src =${data.Poster} class="poster" />
                        <div>
                            <h2> ${data.Title}</h2>
                            <div class="rating">
                                <img src="comp/star.png">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtine}</span>
                            </div>
                            <div class="genre">
                                <div>
                                    ${data.Genre.split(",").join(
                                      " <div></div>"
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                        <h3>Plot:</h3>
                        <p>${data.Plot}</p>
                        <h3>Cast:</h3>
                        <P>${data.Actors}</P>
                    `;
        }
        //if movie does not exists in database
        else {
          result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
        }
      })
      //if error occurs
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
      });
  }
  input.value = "";
};

searchBtn.addEventListener("click", getMovie);
// window.addEventListener("load", getMovie);
