import LeftBarHome from "./LeftBarHome/LeftBarHome";
import SideBarDxHomePage from "./SideBarDxHomePage";
import HomeMain from "./main/home/HomeMain";

const Home = function () {
  return (
    <>
      <div className="d-flex mx-5 my-4 justify-content-center">
        <div className="d-block d-md-none mt-3 mx-4 w-100">
          <LeftBarHome size="100%" addClass="" />
        </div>
      </div>
      <div className="d-flex mx-5 my-4 justify-content-center">
        <div className="d-none d-md-block">
          <LeftBarHome size="225px" addClass="position-fixed" />
        </div>

        <div className="mx-4" style={{ maxWidth: "555px", width: "auto" }}>
          {/* MAIN (centro) */}
          <HomeMain />

          {/* RightBar sotto su mobile */}
          <div className="d-block d-lg-none mt-3">
            <SideBarDxHomePage />
          </div>
        </div>

        {/* RightBar a destra su desktop */}
        <div className="d-none d-lg-block" style={{ width: "300px", minWidth: "300px" }}>
          <SideBarDxHomePage />
        </div>
      </div>
    </>
  );
};

export default Home;
