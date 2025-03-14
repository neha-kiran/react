import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
	const [btnName, setBtnName] = useState("Login");
	const onlineStatus = useOnlineStatus();
	return (
		<div className="header">
			<div className="logo-container">
				<img alt="logo" className="logo" src={LOGO_URL} />
			</div>
			<div className="nav-items">
				<ul>
					<li>Online Status : {onlineStatus ? "✅" : "❌"}</li>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/about-us">About Us</Link>
					</li>
					<li>
						<Link to="/contact-us">Contact Us</Link>
					</li>
					<li>Cart</li>

					<button
						className="login"
						style={{ cursor: "pointer" }}
						onClick={() =>
							btnName === "Login" ? setBtnName("Logout") : setBtnName("Login")
						}
					>
						{btnName}
					</button>
				</ul>
			</div>
		</div>
	);
};

export default Header;
