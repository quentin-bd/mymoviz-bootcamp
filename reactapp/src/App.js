import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Row, } from 'reactstrap'; /* import grid system */
import { Nav, NavLink, } from 'reactstrap';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody, ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// import MyNav from './MyNav'
import FilmCard from './FilmCard';




function App() {

  //States init//
  const [movieCounter, setMovieCounter] = useState(0);
  const [moviesWishList, setMoviesWishList] = useState([]);
  const [dataStatus, setDataStatus] = useState([]);  

//use effect, set moviesList with api data//
useEffect(() => {
 async function loadData() {
   var rawResponse = await fetch('/new-movies');
   var response = await rawResponse.json();
   setDataStatus(response.results)
 }
 loadData();

 async function getWishList() {
  var rawWishlist = await fetch('/wishlist-movie');
  var myWishlist = await rawWishlist.json();
  var fWish = myWishlist.map(movie => {
    return {wTitle: movie.title, wImg: movie.poster}
  })
  setMoviesWishList(fWish);
  setMovieCounter(fWish.length)
 }
 getWishList();
}, []);
console.log('datastatus: ', dataStatus)
console.log('fwish is: ', moviesWishList)
  //handlers
  var handleClickAddMovie = async (movieTitle, movieImg) => {
    console.log('Hello itsa Me, Clikio');
    setMovieCounter(movieCounter + 1)
    console.log(movieTitle);
    await fetch('/wishlist-movie', {
 method: 'POST',
 headers: {'Content-Type':'application/x-www-form-urlencoded'},
 body: `movieName=${movieTitle}&moviePoster=${movieImg}`
});
    setMoviesWishList([...moviesWishList, { wTitle: movieTitle, wImg: movieImg }]);


  };

  // var handleClickDeleteMovie = (movieTitle) => {
  //   console.log(movieTitle, ': I will unlike your ass');
  //   setMovieCounter(movieCounter - 1);
  //   setMoviesWishList(moviesWishList.filter((el) => el.wTitle !== movieTitle));

  // };

  var handleWishListDelete = async (movie) => {
    console.log('felt cute might delete', movie, 'later');
    if (movieCounter > 0) {
      setMovieCounter(movieCounter - 1);
    }
    await fetch(`/delete-movie/${movie}`, {
 method: 'DELETE'
});
    setMoviesWishList(moviesWishList.filter((el) => el.wTitle !== movie));

  }

  // let MoviesData = [
    
  //   {
  //     title: 'BadBoy 3',
  //     desc: 'Miami detectives Mike Lowrey and Marcus Burnett must face off against a mother-and-son pair of drug lords who wreak vengeful havoc on their city.',
  //     img: 'badboy3',
  //     note: 5,
  //     vote: 4,
  //   },
  //   {
  //     title: 'Frozen',
  //     desc: 'When the newly crowned Queen Elsa accidentally uses her power to turn things into ice to curse her home in infinite winter, her sister Anna teams up with a mountain man, his playful reindeer, and a snowman to change the weather condition.',
  //     img: 'frozen',
  //     note: 4,
  //     vote: 6,
  //   },
  //   {
  //     title: 'Jumanji: The Next Level',
  //     desc: `In Jumanji: The Next Level, the gang is back but the game has changed. As they return to rescue one of their own, the players will have to brave parts unknown from arid deserts to snowy mountains, to escape the world's most dangerous game..`,
  //     img: 'jumanji',
  //     note: 2,
  //     vote: 6,
  //   },
  //   {
  //     title: 'Maleficent',
  //     desc: 'A vengeful fairy is driven to curse an infant princess, only to discover that the child may be the one person who can restore peace to their troubled land.',
  //     img: 'maleficent',
  //     note: 6,
  //     vote: 2,
  //   },
  //   {
  //     title: 'Once Upon a Time... In Hollywood',
  //     desc: `A faded television actor and his stunt double strive to achieve fame and success in the final years of Hollywood's Golden Age in 1969 Los Angeles.`,
  //     img: 'once_upon',
  //     note: 7,
  //     vote: 11,
  //   },
  //   {
  //     title: 'Star Wars: Episode IX - The Rise of Skywalker',
  //     desc: `In the riveting conclusion of the landmark Skywalker saga, new legends will be born-and the final battle for freedom is yet to come.`,
  //     img: 'starwars',
  //     note: 3,
  //     vote: 5,
  //   },
  //   {
  //     title: 'Terminator: Dark Fate',
  //     desc: `An augmented human and Sarah Connor must stop an advanced liquid Terminator from hunting down a young girl, whose fate is critical to the human race.`,
  //     img: 'terminator',
  //     note: 9,
  //     vote: 4,
  //   },

  // ]

  

  // ****** WISHLIST MAPPING ****** //
 
  let myWishList = moviesWishList.map((movie) => {

    return <ListGroupItem>
      <div className='d-flex align-items-center wishItem'>
        <img src={movie.wImg} height='60px' alt={`${movie.wTitle} thumbnail`} />
        <span className="mx-2">{movie.wTitle}</span>
        <FontAwesomeIcon icon={faTrashAlt} className="text-danger wTrash" onClick={() => handleWishListDelete(movie.wTitle)} />
      </div>
    </ListGroupItem>
  })
  console.log(moviesWishList)

  // ****** MOVIELIST MAPPING ****** //
  const imgBaseUrl = 'https://image.tmdb.org/t/p/w500/'
  let MovieList = dataStatus.map((movie, i) => {
    let result = moviesWishList.find(el => el.wTitle === movie.title);
    let inWishList = false;
    if (result !== undefined) {
      inWishList = true
      console.log(result, ' is in wishlist')
    }

    return <FilmCard key={i} movieTitle={movie.title} movieDesc={movie.overview} globalRating={movie.vote_average} globalCountRating={movie.vote_count} movieImg={`${imgBaseUrl}${movie.backdrop_path}`} parentalControl={handleClickAddMovie} deleteMovie={handleWishListDelete} inWishList={inWishList} />
  })
  var background = {
    background: '#222'
  }
  return (
    <div style={background}>
      <Container>
        <Row>

          <div>
            <Nav className="mt-3">
              <img src="/img/logo.png" alt="logo" />
              <NavLink href="#" className="text-white">Last Releases</NavLink>
              <Button className="btn btn-secondary text-white" id="PopoverLegacy" type="button">{movieCounter}films</Button>
              <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
                <PopoverHeader>My private garden 🍑</PopoverHeader>
                <PopoverBody>
                  <ListGroup>
                    {myWishList}
                  </ListGroup>
                </PopoverBody>
              </UncontrolledPopover>
            </Nav>
          </div>
        </Row>

        <Row className="mt-5">
          {MovieList}
        </Row>
      </Container>
    </div>

  );
}

export default App;
