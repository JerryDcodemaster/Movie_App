$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    })
});

let apiKey = '41855128';

function getMovies(searchText) {
    let result = `https://www.omdbapi.com/?s=${searchText}&apikey=${apiKey}`;

    axios.get(result)
        .then((res) => {
            console.log(res);
            let movies = res.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                   <div class="col-md-3">
                    <div class="well text-center">
                       <img src="${movie.Poster}" />
                       <h5>${movie.Title}</h5>
                       <a onClick="movieSelected('${movie.imdbID}')" class="btn btn-primary mb-4" href="#">Movie Details</a>
                    </div>
                   </div>
                `;
            });

            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get(`https://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`)
    .then((res) => {
        console.log(res);
        let movie = res.data;

        let output = `
            <hr>
            <div class="row mb-5">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail" />
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                        <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                        <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                        <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                        <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                        <li class="list-group-item"><strong>Language:</strong> ${movie.Language}</li>
                        <li class="list-group-item"><strong>Awards:</strong> ${movie.Awards}</li>
                        <li class="list-group-item"><strong>Country:</strong> ${movie.Country}</li>
                        <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                    </ul>
                </div>
            </div>
            <hr>

            <div class="row mb-5">
                <div class="well">
                    <h4>Plot</h4>
                    ${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                    <a href="index.html" class="btn btn-success">Go Back To Search</a>
                </div>
            </div>
        `; 

        $('#movie').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}