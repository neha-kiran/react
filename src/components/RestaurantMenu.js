import { useParams } from "react-router-dom";
import { CDN_URL, RESTAURANT_MENU, DISH_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { Shimmer } from "./Shimmer";

const RestaurantMenu = () => {
	const { restaurantId } = useParams();
	const [restaurantMenu, setRestaurantMenu] = useState(null);
	// const [itemCards, setItemCards] = useState(null);
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const data = await fetch(RESTAURANT_MENU + restaurantId);
		const json = await data.json();
		setRestaurantMenu(json?.data);

		console.log(restaurantMenu ?? "no");
	};
	if (restaurantMenu === null) return <Shimmer />;

	const { name, city, costForTwoMessage, cuisines, avgRating } =
		restaurantMenu?.cards[2]?.card?.card?.info;

	// setItemCards(
	// 	restaurantMenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
	// 		?.card
	// );
	// console.log("old", itemCards);
	// setItemCards(
	// 	restaurantMenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
	// 		?.card
	// );
	// }
	console.log(restaurantMenu);
	const itemCards =
		restaurantMenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
			?.card?.itemCards;

	console.log("new", itemCards);
	return (
		<div className="restaurant">
			<h2 style={{ color: "mediumvioletred" }}>
				{name} {"⭐️" + avgRating}
			</h2>
			<h4>
				{cuisines.join(", ")} - {costForTwoMessage}
			</h4>
			<h5>{city}</h5>
			<div className="menu">
				{itemCards?.map((menu) => (
					<div className="dish" key={menu?.card?.info?.id}>
						<img
							className="dish-img"
							alt="imageId"
							src={DISH_URL + menu?.card?.info?.imageId}
						></img>
						<h3>{menu?.card?.info?.name}</h3>

						<h4>
							{"Rs " +
								(menu?.card?.info?.defaultPrice ?? menu?.card?.info?.price) /
									100}
						</h4>
						<h5>{menu?.card?.info?.itemAttribute.portionSize}</h5>
					</div>
				))}
			</div>
		</div>
	);
};

export default RestaurantMenu;
