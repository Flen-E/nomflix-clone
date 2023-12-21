import { styled } from "styled-components";
import { makeImagePath } from "../utils";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { IData } from "../api";
import { AnimatePresence } from "framer-motion";
import DetailModal from "./DetailModal";


const Wrapper = styled.div<{bgphoto : string}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 6.8rem 6rem;
  background-repeat: no-repeat;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: 100%;
  background-position: center center;
  
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;
const OverView = styled.p`
  font-size: 30px;
  width: 50%;
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PlayMovie = styled.div`
  background-color: white;
  width: 8vw;
  margin : 30px 0px;
  padding : 15px 20px;
  text-align: center;
  border-radius: 5px;
  color: black;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.4rem;
  &:hover{
    background-color: #ced4da;
    cursor: pointer;
  }
`;

const DetailInfo = styled.div`
  background-color: rgba(128,128,128,0.9);
  color : white;
  width: 12vw;
  margin : 30px 0px;
  padding : 15px 20px;
  text-align: center;
  border-radius: 5px;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.4rem;
  &:hover{
    background-color:  rgba(128,128,128,0.3);
    cursor: pointer;
  }
`;


function Banner({
    bannerInfo,
    detailSearchUrl,
    requestUrl,
} : {
    bannerInfo : IData;
    detailSearchUrl : string;
    requestUrl :string;
}) {
    const bigMatch: PathMatch<string> | null = useMatch(`/:menuName/banner/:id`);
    const navigate = useNavigate();

    const onDetailClicked = (movieId: number) => {
        navigate(`/${detailSearchUrl}/${movieId}`);
      };
    

   
    return (
        <Wrapper
        bgphoto={makeImagePath(bannerInfo.backdrop_path || "")}
        >
             <Title>{bannerInfo.title}</Title>
            <OverView>{bannerInfo.overview}</OverView>
            <BtnBox>
              <PlayMovie><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="currentColor"></path> </svg> 재생</PlayMovie>
              <DetailInfo onClick={()=> onDetailClicked(bannerInfo.id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"/> 
</svg> 상세정보 </DetailInfo>


            </BtnBox>
            <AnimatePresence>
                {bigMatch ? (
                    <DetailModal/>
                ) : null}
            </AnimatePresence>

        </Wrapper>
    )
}



export default Banner;