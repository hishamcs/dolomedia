import './list.scss'
import UserInfo from './userInfo/UserInfo'
import ChatList from './chatList/ChatList'
import Search from './search/Search'

const List = () => {
    return (
        <div className="list">
            {/* <UserInfo /> */}
            <Search />
            <ChatList />
        </div>
    )
}

export default List