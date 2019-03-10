import React, { Component } from "react";

import NewToolbar from "./NewToolbar";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";

class Navbar extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawerTogglerClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <React.Fragment>
        <NewToolbar drawerClickHandler={this.drawerTogglerClickHandler} />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
      </React.Fragment>
    );
  }
}

export default Navbar;
