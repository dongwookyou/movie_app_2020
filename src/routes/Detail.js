import React from 'react';
import Home from './Home';
import {Link} from 'react-router-dom';

class Detail extends React.Component{
    componentDidMount(){
        window.scrollTo(0, 0);
        const {location, history} = this.props;
        if(location.state === undefined){
            history.push("/");
        }
    }

    componentWillUnmount() {
        
    }

    render(){
        const {location} = this.props;
        if(location.state){
            return(
                <div className="detail_cont">
                    <div>                        
                        <span>{location.state.year}</span>
                        <h3>{location.state.title}</h3>
                        <ul className="movie_genres clear">
                            {location.state.genres.map((genre, index) =>
                            <li key={index} className="genres_genre">{genre}</li>
                            )}
                        </ul>
                        <div className="img_box">
                            <em>{location.state.rating}</em>
                            <i></i>
                            <img src={location.state.poster} alt={location.state.title} title={location.state.title} />
                        </div>
                        <p>{location.state.summary}</p>
                    </div>
                    <Link className="back_btn" to="/"><em className="blind">Home</em></Link>
                </div>
            )
        }else{
            return null;
        }
    }
}




export default Detail;