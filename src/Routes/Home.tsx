import { useQuery } from "react-query";
import { IGetMoviesResult, IMovie, getMovies } from "../api";
import { styled } from "styled-components";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;
const OverView = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  color: red;
  font-size: 66px;
  &:first-child{
    transform-origin : center left;
  }
  &:last-child{
    transform-origin : center right;
  }
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth - 50,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth + 50,
  },
};

const boxVariants = {
  normal :{
    scale :1,
  },
  hover : {
    scale : 1.3,
    y : -50,
    transition :{
      delay : 0.2,
      
    }
  },


}

const offset = 6;

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = useState(0);

  const [leavingSlider, setLeavingSlider] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leavingSlider) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;

      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeavingSlider((prev) => !prev);

  console.log(data, isLoading);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <OverView>{data?.results[0].overview}</OverView>
          </Banner>
          <Slider>
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
                    variants={boxVariants}
                      key={movie.id}
                      initial ="normal"
                      whileHover= "hover"
                      transition ={{type: "tween"}}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    />
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
