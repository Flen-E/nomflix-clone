const API_KEY = "e9b633f8b2a2195fda09069c0b8e0c84";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
    id : number;
    backdrop_path : string;
    poster_path : string;
    title : string;
    overview : string

}

export interface IGetMoviesResult {
    dates:{
        maximum : string;
        minimun : string;
    };
    page: number;
    results : IMovie[];
    total_pages : number;
    total_results : number;
}

export function getMovies(){
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
        response => response.json()
    );
}

//fetcher는 데이터를 받아오고 JSON을 리턴하는 함수에 불과함