import styled from "styled-components";

const Nav = styled.nav``;

const Col = styled.div``;

const Logo = styled.div``;

const Items = styled.div``;

const Item = styled.div``;



function Header() {
    return (
        <Nav>
            <Col>
                <Logo/>
                <Items>
                    <Item>Home</Item>
                    <Item>Tv Shows</Item>
                </Items>
            </Col>
            <Col>
                <button>

                </button>
            </Col>
        </Nav>
    )

}
export default Header;