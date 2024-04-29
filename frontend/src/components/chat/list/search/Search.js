import './search.scss';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import AddUser from './addUser/AddUser';


const Search = () => {
    const [addMode, setAddMode] = useState(false)
    return (
        <div className='chat-search'>
            
            <div className='searchBar'>
                <SearchIcon/>
                <input type='text'placeholder='Search'/>
            </div>
            <AddIcon className='add' onClick={()=>setAddMode(prev=>!prev)}/>

            {addMode && <AddUser />}
        </div>
    )
}


export default Search