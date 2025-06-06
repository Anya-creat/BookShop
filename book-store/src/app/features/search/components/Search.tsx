import { SearchIcon } from "@/app/svg/svg";
import styles from "./styles.module.css"

const Search: React.FC = () => {

    return (
        <div className={styles.search_wrapper}>
            <input 
                type="search"
                placeholder="Search..."
            />
            <button type='submit'><SearchIcon/></button>
        </div>
    );
};

export default Search;