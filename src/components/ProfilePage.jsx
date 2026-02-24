import RightBar from "./RightBar/RightBar"
import ProfileMain from "./main/profile/ProfileMain"

const ProfilePage = function () {
  return (
    <div className="d-flex mx-5 my-4">
      <div className="me-4 flex-grow-1">
        {/* MAIN (centro) */}
        <ProfileMain />
        <div className="d-block d-lg-none">
          <RightBar size="100%" />
        </div>
      </div>

      <div className="d-none d-lg-block">
        <RightBar size="304px" />
      </div>
    </div>
  )
}

export default ProfilePage
