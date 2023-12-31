import { useQuery } from "react-query";
import { IData, IGetDataResult, MOVIE_LIST, getNowPlayingMovies } from "../api";
import { styled } from "styled-components";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import Banner from "../Components/Banner";
import Slider from "../Components/Slider";

const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderArea = styled.div`
  position: relative;
  margin-top: -16.8rem;
  @media screen and (max-width: 700px) {
    margin-top: -8.8rem;
  }
`;



const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.img`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding : 20px;
  font-size: 46px;
  position: relative;
  top :-80px;
`;

const BigOverview = styled.p`
  padding : 20px;
  position: relative;
  color: ${(props) => props.theme.white.lighter};
  top :-80px;
`;


function Home() {
  const navigate = useNavigate();
  const bigMovieMatch: PathMatch<string> | null = useMatch("movies/:movieId");
  const { scrollY } = useScroll();
    // nowplaying
    const { data: nowPlayingMoviesList, isLoading } = useQuery<IGetDataResult>(
      [MOVIE_LIST[0], "nowPlayingMovies"],
      getNowPlayingMovies
    );
  const onOverlayClick = () => {
    navigate("/");
  };


  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    nowPlayingMoviesList?.results.find(
      (movie) => String(movie.id) === bigMovieMatch.params.movieId
    );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bannerInfo={nowPlayingMoviesList?.results[0] as IData}
            detailSearchUrl={`home/banner`}
            requestUrl={"movie"}
          />
          <SliderArea>
            <Slider
            data = {nowPlayingMoviesList as IGetDataResult}
            title = {"새로 올라온 콘텐츠"}
            movieList={MOVIE_LIST[0]}
            menuName={"home"}
            mediaType={"movie"}
            

            />

          </SliderArea>
          

          
          {/* <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ ease: "linear", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      variants={boxVariants}
                      key={movie.id}
                      initial="normal"
                      whileHover="hover"
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: "tween" }}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider> */}
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 50 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
