import { Link } from "react-router-dom";
import { userInfo } from "../../../../helper/helper";
const UserInfoSidebar = () => {
    const user = userInfo();
    return (
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Photo" />
            </div>
            <div className="info">
                <Link to={'#'} className="d-block">{user.name}</Link>
            </div>
        </div>
    )
}
export default UserInfoSidebar;