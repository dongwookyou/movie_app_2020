import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import "./Movie.scss";
import Img from '../images/thumbnail.png';

function Movie({id, year, title, summary, poster, genres, rating}){
    return (
        <li className="movie">
            <Link
                to={{
                    pathname:`/movie/${id}`,
                    state:{
                        year,
                        title,
                        summary,
                        poster,
                        genres,
                        rating
                    }
                }}
            >
                <img style={{backgroundImage:`url(${poster})`}} src={Img} alt={title} title={title} />                    
                <div className="movie_data">
                <h3 className="movie_title"><span>{rating}</span>{title}</h3>
                    <div className="movie_box">
                        <h5 className="movie_year">{year}</h5>
                        {/* <ul className="movie_genres">
                            {genres.map((genre, index) =>
                            <li key={index} className="genres_genre">{genre}</li>
                            )}
                        </ul> */}
                        <p className="movie_summary">{summary.slice(0, 40)}...</p>
                    </div>
                </div>
            </Link>
        </li>
    )
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    rating: PropTypes.number.isRequired
}

export default Movie;