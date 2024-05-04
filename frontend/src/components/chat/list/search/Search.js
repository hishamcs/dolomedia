import './search.scss';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useContext, useState } from 'react';
import AddUser from './addUser/AddUser';
import ChatContext from '../../../../context/ChatContext';


const Search = () => {
    const {searchInput, setSearchInput} = useContext(ChatContext)
    const [addMode, setAddMode] = useState(false)
    return (
        <div className='chat-search'>
            
            <div className='searchBar'>
                <SearchIcon/>
                <input type='text'placeholder='Search' value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/>
            </div>
            <AddIcon className='add' onClick={()=>setAddMode(prev=>!prev)}/>

            {addMode && <AddUser />}
        </div>
    )
}


export default Search