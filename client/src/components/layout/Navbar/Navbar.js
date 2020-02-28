import React, { useState } from "react";

import Toolbar from "./Toolbar";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";

const Navbar = props => {
	const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

	const drawerTogglerClickHandler = () => {
		setSideDrawerOpen(!sideDrawerOpen);
	};

	const backdropClickHandler = () => {
		setSideDrawerOpen(false);
	};

	let backdrop;

	if (sideDrawerOpen) {
		backdrop = <Backdrop click={backdropClickHandler} />;
	}

	return (
		<React.Fragment>
			<Toolbar drawerClickHandler={drawerTogglerClickHandler} />
			<SideDrawer show={sideDrawerOpen} />
			{backdrop}
		</React.Fragment>
	);
};

export default Navbar;
