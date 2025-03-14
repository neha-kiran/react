import { useEffect, useState } from "react";

const useOnlineStatus = () => {
	const [onlineStatus, setOnlineStatus] = useState(true);

	useEffect(() => {
		window.addEventListener("online", () => {
			setOnlineStatus(true);
		});
		window.addEventListener("offline", () => {
			setOfflineStatus(false);
		});
	});
	return onlineStatus;
};

export default useOnlineStatus;
