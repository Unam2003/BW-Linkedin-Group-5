import SideBarDxHomePage from "./SideBarDxHomePage";
import HomeMain from "./main/home/HomeMain";

const Home = function () {
  return (
    <div className="d-flex mx-5 my-4">
      <div className="me-4 flex-grow-1">
        {/* MAIN (centro) */}
        <HomeMain />

        {/* RightBar sotto su mobile */}
        {/* <div className="d-block d-lg-none mt-3">
          <RightBar size="100%" />
        </div> */}
      </div>

      {/* RightBar a destra su desktop */}
      <div className="d-none d-lg-block">
        <SideBarDxHomePage size="304px" />
      </div>
    </div>
  );
};

export default Home;
