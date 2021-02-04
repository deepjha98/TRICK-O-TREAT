import React from "react";
import { Helmet } from "react-helmet";
//////////////////////////////////////////
//CLASS BASED HOME PAGE
class Home extends React.Component {
  //-----RENDER METHOD FOR THE HOME PAGE---
  render() {
    return (
      <>
        <Helmet>
          <title>TRICK-O-TREAT</title>
          <meta
            name="description"
            content="This is a blog to list all the  ongoing deals. It helps you earn rewardz. Also do join our telegram channel to access all the lightning deals on time"
          />
        </Helmet>
        <div>
          <h1>HELLO FROM HOME PAGE</h1>
        </div>
      </>
    );
  }
}
/////////////////////////////////////////
export default Home;
