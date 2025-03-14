import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import { Shimmer } from "./Shimmer";
import { RESTAURANT_LIST } from "../utils/constants";
import { Link } from "react-router-dom";
// import resList from "../utils/mockData";

const Body = () => {
	const [listOfRestaurants, setListOfRestaurants] = useState([]);
	const [filteredRestaurants, setFilteredRestaurants] = useState([]);
	const [searchText, setSearchText] = useState("");
	//whenever state variables update react triggers a reconciliation cycle (re-renders the whole component)
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const data = await fetch(RESTAURANT_LIST);
		const json = await data.json();

		setListOfRestaurants(
			json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
		);

		setFilteredRestaurants(
			json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
		);
	};

	return listOfRestaurants.length === 0 ? (
		<Shimmer />
	) : (
		<div className="body">
			<div className="filter">
				<div className="search">
					<input
						type="text"
						className="search-box"
						value={searchText}
						onChange={(e) => {
							setSearchText(e.target.value);
						}}
					/>
					<button
						className="search-btn"
						onClick={() => {
							const filteredRestaurants = listOfRestaurants.filter((res) =>
								res.info.name.toLowerCase().includes(searchText.toLowerCase())
							);
							setFilteredRestaurants(filteredRestaurants);
						}}
					>
						Search
					</button>
				</div>
				<button
					className="filter-btn"
					onClick={() => {
						const filteredList = listOfRestaurants.filter(
							(res) => res.info.avgRating > 4.3
						);
						console.log(filteredList);
						setFilteredRestaurants(filteredList);
					}}
				>
					Top rating restaurants
				</button>
			</div>

			<div className="res-container w-100">
				{filteredRestaurants.map((restaurant) => (
					<Link
						key={restaurant.info.id}
						to={"/restaurant/" + restaurant.info.id}
					>
						<RestaurantCard key={restaurant.info.id} resData={restaurant} />
					</Link>
				))}
			</div>
		</div>
	);
};
export default Body;
