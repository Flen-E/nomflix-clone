const API_KEY = "e9b633f8b2a2195fda09069c0b8e0c84";
const LANGUAGE = "ko-KO";
const BASE_PATH = "https://api.themoviedb.org/3";
const REGION = "KR";
const TAIL_PATH = `api_key=${API_KEY}&language=${LANGUAGE}&region=${REGION}`;
export const MOVIE_LIST = [
    "nowPlaying",
    "upcomingMovies",
    "topRatedMovies",
    "tvShow",
  ]; // 영상 종류

// 영화 데이터
export interface IData {
    id: number; // 정보의 id
    backdrop_path: string; // 대형 이미지
    poster_path: string; // 포스터 이미지
    title?: string; // 제목
    name?: string; // 제목
    overview: string; // 영화 요약
  }

  export interface ISlider{
    data : IGetDataResult;
    title : string;
    movieList : string;
    menuName : string;
    mediaType :string;
  }

  // themoviedb.org "movie/now_playing" api interface
export interface IGetDataResult {
    dates?: {
      maximum: string;
      minimum: string;
    };
    page: number;
    results: IData[]; // 영화 데이터 interface의 []
    total_pages: number;
    total_results: number;
  }

// Movies - NowPlaying
export function getNowPlayingMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?${TAIL_PATH}`).then((response) =>
      response.json()
    );
  }

//fetcher는 데이터를 받아오고 JSON을 리턴하는 함수에 불과함