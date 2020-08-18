import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import "./style.scss";
import Img from '../images/main.jpg';
import { func } from 'prop-types';


// function Home(){
class Home extends React.Component{
  state ={
    isLoading: true,
    items: 5,
    preItems: 0,
  };
  getMovies = async () => {
    const {data:{data:{movies}}} = await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating");
    const result = movies.slice(this.state.preItems, this.state.items);
    this.setState({result, isLoading: false, itemsLoading: false});    
  }
  
  infiniteScroll = () => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
        
    if(scrollTop + clientHeight === scrollHeight){
      this.setState({
        preItems: this.state.items.concat,
        items: this.state.items + 5
      })

      this.getMovies();
    }    
  }

  componentDidMount(){
    this.getMovies();
    window.addEventListener('scroll', this.infiniteScroll, true);
  }
  render(){
    const {isLoading, result} = this.state;
    
    return (
        <section className="container">
            {isLoading ? (
            <div className="loader">
                <svg className="spinner" width="50px" height="50px" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                  <circle className="path" fill="none" strokeWidth="4" strokeLinecap="round" cx="25" cy="25" r="20"></circle>
                </svg>
            </div>
            ) : (
              <div className="content">
                <div className="visual">
                  <div className="head_title">
                    <div className="left_item">
                      <h1>캠핑</h1>
                      <span>- 라이프 스타일 / 여행</span>
                    </div>
                    <div className="right_item">
                      <button className="pre_btn"><em className="blind">이전</em></button>
                      <span className="datepicker">2020.07.23</span>
                      <button className="next_btn"><em className="blind">다음</em></button>
                    </div>
                  </div>
                  <img src={Img} />
                  <div className="note_sec">
                    <h2 className="main_title">Keypoon's Note</h2>
                    <p>어디론가 훌쩍 떠나 혼자만의 시간을 갖고 싶을 때 우리는 캠핑을 생각하곤 합니다. 최근 벨기에에서는 나무위에서 캠핑을 즐길 수 있는 신개념 캠핑이 등장하기도 했는데요. 캠핑 초보부터 고수까지 즐기는 이색적이고 다양한...</p>
                  </div>
                </div>
                <div className="movies">
                  <h2 className="main_title">Keypoon's Choice</h2>
                  <ul className="movies_content">
                      {result.map(movie => (
                        <Movie                         
                          key={movie.id}
                          id={movie.id} 
                          year={movie.year}
                          title={movie.title} 
                          summary={movie.summary} 
                          poster={movie.large_cover_image} 
                          genres={movie.genres}
                          rating={movie.rating}
                        />                        
                      ))}

                      {/* <li className="loadingBar showing">
                        <span></span>
                        <span></span>
                        <span></span>
                      </li> */}
                  </ul>
                </div>
              </div>
            )}
        </section>
      );
    }
  }
  export default Home;