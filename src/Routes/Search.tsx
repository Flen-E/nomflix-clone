import { useLocation } from "react-router-dom";

function Search() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search);
    return null;
}
export default Search;