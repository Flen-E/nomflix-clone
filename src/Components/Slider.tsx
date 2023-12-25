import { styled } from "styled-components";
import { ISlider } from "../api";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { makeImagePath } from "../utils";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Wrapper = styled.div`
  position: relative;
  min-height: 60rem;
  margin-top: 6rem;
  /* 슬라이더 돌리면서 스크롤 터짐 방지용 */
  overflow: hidden;
  :hover .arrow {
    opacity: 1;
  }
`;

const Title = styled.div`
  font-size: 1.4vw;
  line-height: 1.25vw;
  vertical-align: bottom;
  font-weight: 500;
  color: #e5e5e5;
  margin: 0 4% 0.5em;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(7, 1fr);
  position: absolute;

  width: 107%;
  margin: 0 4% 0.5em;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 9.2rem;
  color: red;
  font-size: 66px;
  border-radius: 0.2vw;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
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
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,

    transition: {
      delay: 0.2,
      duration: 0.1,
      type: "tween",
    },
  },
};

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.1,
      type: "tween",
    },
  },
};

const ArrowBtn = styled(motion.div)<{ mobile: number }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.1rem;
  color: #fff;
  height: 9.2rem;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${(props) => props.mobile};
  transition: all 0.3s;
  z-index: 90;
  border-radius: 0.2vw;
  cursor: pointer;

  &:blur {
    color: #fff;
    background-color: #000;
  }
  svg {
    width: 2.8rem;
    height: 2.8rem;
    display: none;
    
    &:hover {
        display: block;
    }
  }
`;

const LeftArrowBtn = styled(ArrowBtn)`
  left: 0;
`;

const RightArrowBtn = styled(ArrowBtn)`
  right: 0;
`;

const offset = 7;

function Slider({ data, title, movieList, menuName, mediaType }: ISlider) {
  const [leavingSlider, setLeavingSlider] = useState(false);
  const toggleLeaving = () => setLeavingSlider((prev) => !prev);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const onBoxClicked = (menu: string, type: string, id: number) => {
    navigate(`/${menu}/${type}/${id}`);
  };
  return (
    <Wrapper>
      <Title>{title}</Title>
      <LeftArrowBtn>
        <AiOutlineLeft />
      </LeftArrowBtn>
      <RightArrowBtn>
        <AiOutlineRight />
      </RightArrowBtn>
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
                onClick={() => onBoxClicked(menuName, movieList, movie.id)}
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
    </Wrapper>
  );
}
export default Slider;
