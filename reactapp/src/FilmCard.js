import React, { useState } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button, Col
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar, faVideo } from '@fortawesome/free-solid-svg-icons'
import { Badge } from 'reactstrap';


const FilmCard = (props) => {


  let descArr = props.movieDesc.split(' ');
  let shortDesc = "";
  if (descArr.length > 14) {
    descArr.splice(14, descArr.length - 14);
    descArr.push('...');

    shortDesc = descArr.join(' ')
  }

  // States Init //

  const [watchMovie, setWatchMovie] = useState(false);
  const [countWatchMovie, setCountWatchMovie] = useState(0);
  const [myRatingMovie, setMyRatingMovie] = useState(0);
  // const [avgNote, setAvgNote] = useState(props.globalRating);
  const [nbVotes, setNbVotes] = useState(props.globalCountRating);

  //Event handlers//
  var handleHeartClick = () => {
    if (props.inWishList === false) {
      // setLikeMovie(true);
      props.parentalControl(props.movieTitle, props.movieImg);
      console.log('i likylike that');
    } else {
      // setLikeMovie(false);
      props.deleteMovie(props.movieTitle);
      
    }
    
  }
  var handleCamClick = () => {
    setWatchMovie(true);
    setCountWatchMovie(countWatchMovie + 1)
    console.log('it wasnt me');
  }

  var handlePlusClick = () => {
    if (myRatingMovie < 10) {
      setMyRatingMovie(myRatingMovie + 1);
      if (!myRatingMovie) {
        setNbVotes(nbVotes + 1);
      }

    }
    console.log('DOOOOPPPE')
  }
  var handleMinusClick = () => {
    if (myRatingMovie >= 1) {
      setMyRatingMovie(myRatingMovie - 1);
      if (!myRatingMovie) {
        setNbVotes(nbVotes + 1);
      }

    }
    console.log('Out of my sight loser !')
  }


  var findStarPosition = (pos) => {
    console.log(pos);
    if (pos < 10) {
      setMyRatingMovie(pos);
      if (!myRatingMovie) {
        setNbVotes(nbVotes + 1);
      }

    }
  }


  // color change //
  var colorLike;
  if (props.inWishList === true) {
    colorLike = { color: "rgb(240, 50, 50)" };
  }
  var colorCam;
  if (watchMovie === true) {
    colorCam = { color: "rgb(240, 50, 50)" };
  };

  // starlists
  let starList = [];

  for (let i = 0; i < 10; i++) {
    if (i < myRatingMovie) {

      starList.push(<FontAwesomeIcon onClick={() => findStarPosition(i + 1)} className='star' key={i} id={i} icon={faStar} style={{ color: 'gold' }} />);
    } else {
      starList.push(<FontAwesomeIcon onClick={() => findStarPosition(i + 1)} className='star' key={i} id={i} icon={faStar} />);
    }
  }



  let globalStarList = [];
  let avgNote = Math.round(((props.globalRating * props.globalCountRating) + myRatingMovie) / (props.globalCountRating + 1));

  for (let i = 0; i < 10; i++) {
    if (i < avgNote) {

      globalStarList.push(<FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />);
    } else {
      globalStarList.push(<FontAwesomeIcon icon={faStar} />);
    }
  }

  //console logs
  // console.log(`Title : ${props.movieTitle}, moyenne : ${props.globalRating}, nb de votes : ${props.globalCountRating}`)

  return (
    <Col className="col-12 col-lg-6 col-xl-4 mb-4">
      <Card height="">
        <CardImg top width="100%" src={props.movieImg} alt="Card image cap" />
        <CardBody>
          <CardText >Like <FontAwesomeIcon icon={faHeart} className="heartBtn" style={colorLike} onClick={() => handleHeartClick()} /></CardText>
          <CardText>
            Nombre de vues&nbsp;
            <FontAwesomeIcon className="camBtn" style={colorCam} icon={faVideo} onClick={() => handleCamClick()} />&nbsp;
            <Badge className="bg-secondary">{countWatchMovie}</Badge>
          </CardText>
          <CardText>Mon avis {starList} ({myRatingMovie})
            <div>
              <Button className="bg-secondary mx-1" size="sm" onClick={() => handlePlusClick()}>+</Button>
              <Button size="sm" className="bg-secondary" onClick={() => handleMinusClick()}>-</Button>
            </div>
          </CardText>
          <CardText>Moyenne {globalStarList} ({nbVotes})</CardText>
          <CardTitle tag="h5">{props.movieTitle}</CardTitle>
          <CardText>{shortDesc}</CardText>
        </CardBody>
      </Card>
    </Col>


  );
};

export default FilmCard;
