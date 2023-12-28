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

const ArrowBtn = styled(motion.div)<{ mobile: number}>`
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
  z-index: 100;
  border-radius: 0.2vw;
  cursor: pointer;
  


  &:blur {
    color: #fff;
    background-color: #000;
  }
  svg {
    width: 2.8rem;
    height: 2.8rem;
    
  }
`;

const LeftArrowBtn = styled(ArrowBtn)<{isVisible: boolean }>`
opacity: ${props => (props.isVisible ? '1' : '0')};
  transition: opacity 0.3s ease-in-out;
  left: 0;
`;

const RightArrowBtn = styled(ArrowBtn)<{isVisible: boolean }>`
opacity: ${props => (props.isVisible ? '1' : '0')};
  transition: opacity 0.3s ease-in-out;
  right: 0;
`;

const offset = 7;

function Slider({ data, title, movieList, menuName, mediaType }: ISlider) {
  const [leavingSlider, setLeavingSlider] = useState(false);
  const toggleLeaving = () => setLeavingSlider((prev) => !prev);
  const [back, setBack] = useState(false);
  const [pageVisible, setPageVisible] = useState(1);
  const nextPlease = () => {setBack(false); setPageVisible(prev => prev === 10 ? 1 : prev +1 )};
  const prevPlease = () => {setBack(true); setPageVisible(prev => prev === 1 ? 10 : prev -1)};
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const onBoxClicked = (menu: string, type: string, id: number) => {
    navigate(`/${menu}/${type}/${id}`);
  };

   // 마우스를 버튼 위에 올리면 isVisible을 true로 설정하여 버튼이 나타나게 합니다.
   const handleMouseEnter = () => {
    setIsVisible(true);
  };

  // 마우스가 버튼을 벗어나면 isVisible을 false로 설정하여 버튼이 사라지게 합니다.
  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <Wrapper onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>
      <Title>{title}</Title>
      <LeftArrowBtn isVisible={isVisible}>
        <AiOutlineLeft   />
      </LeftArrowBtn>
      <RightArrowBtn isVisible={isVisible}>
        <AiOutlineRight />
      </RightArrowBtn>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          custom={back}
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
