import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
// import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const AboutUs = lazy(() => import("./components/AboutUs"));

// const TodoItem = (props) => <li onClick={props.onClick}>{props.item.text}</li>;

// const TodoList = ({ items, onListClick, onItemClick }) => {
// 	const handleItemClick = (item, event) => {
// 		// Write your code here
// 		event.stopPropagation();
// 		if (!item.done) onItemClick(item, event); // Call the onItemClick prop
// 	};

// 	return (
// 		<ul onClick={onListClick}>
// 			{items.map((item, index) => (
// 				<TodoItem
// 					item={item}
// 					key={index}
// 					onClick={(event) => handleItemClick(item, event)}
// 				/>
// 			))}
// 		</ul>
// 	);
// };

// const items = [
// 	{ text: "Buy grocery", done: true },
// 	{ text: "Play guitar", done: false },
// 	{ text: "Romantic dinner", done: false },
// ];

// const App = (props) => (
// 	<TodoList
// 		items={props.items}
// 		onListClick={(event) => console.log("List clicked!")}
// 		onItemClick={(item, event) => {
// 			console.log(item, event);
// 		}}
// 	/>
// );

// document.body.innerHTML = "<div id='root'></div>";
// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(<App items={items} />);

const AppLayout = () => (
	<div className="app">
		<Header />
		<Outlet />
	</div>
);

const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Body />,
			},
			{
				path: "/about-us",
				element: (
					<Suspense fallback={<h1>Loading...</h1>}>
						<AboutUs />
					</Suspense>
				),
			},
			{
				path: "/contact-us",
				element: <ContactUs />,
			},
			{
				path: "/restaurant/:restaurantId",
				element: <RestaurantMenu />,
			},
		],
		errorElement: <Error />,
	},
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);

//rafce
