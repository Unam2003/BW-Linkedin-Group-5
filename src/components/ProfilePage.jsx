import RightBar from "./RightBar/RightBar";
import ProfileMain from "./main/profile/ProfileMain";
import MyFooter from "./MyFooter";

const ProfilePage = function () {
    return (
        <>
            <div className="d-flex mx-5 my-4 justify-content-center">
                <div className="me-4 ">
                    {/* MAIN (centro) */}
                    <div style={{ maxWidth: "792px" }}>
                        <ProfileMain />
                    </div>
                    <div className="d-block d-lg-none">
                        <RightBar size="100%" />
                    </div>
                </div>

                <div className="d-none d-lg-block">
                    <RightBar size="304px" />
                </div>
            </div>
            <MyFooter />
        </>
    );
};

export default ProfilePage;
