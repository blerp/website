// import React from "react";

// const ProfileHeaderContainer = props => {
//     return (
//         <Header>
//             <HeaderImage />
//             {windowWidth <= 480 ? (
//                 <>
//                     <Row style={{ height: "20px" }}>
//                         <BackButton>Back</BackButton>
//                         {data.web.userSignedIn &&
//                         data.web.userSignedIn._id === data.web.userById._id ? (
//                             <EditProfileSettings
//                                 onClick={() =>
//                                     setShowProfileSettingsModal(true)
//                                 }
//                             />
//                         ) : (
//                             <EditProfileSettings
//                                 style={{ visibility: "hidden" }}
//                             />
//                         )}
//                         {showProfileSettingsModal ? (
//                             <ProfileSettingsModal
//                                 user={data.web.userById}
//                                 onClose={() =>
//                                     setShowProfileSettingsModal(false)
//                                 }
//                             />
//                         ) : (
//                             <></>
//                         )}
//                     </Row>
//                     <MobileContainer>
//                         <MobileProfileImage />
//                         <MobileName>{data.web.userById.firstName}</MobileName>
//                     </MobileContainer>
//                     <Row style={{ height: "auto" }}>
//                         <ProfileStats
//                             plays={data.web.userById.totalPlays}
//                             blerps={
//                                 dataUserBlerps.web.userById.bitePagination.count
//                             }
//                             followerCount={data.web.userById.followerCount}
//                             followingCount={data.web.userById.followingCount}
//                         />
//                     </Row>
//                     <Row style={{ height: "60px" }}>
//                         {/* empty space for the profile nav */}
//                     </Row>
//                 </>
//             ) : (
//                 <>
//                     <Row>
//                         <BackButton>Back</BackButton>
//                         <ProfileStats
//                             plays={data.web.userById.totalPlays}
//                             blerps={
//                                 dataUserBlerps.web.userById.bitePagination.count
//                             }
//                             followerCount={data.web.userById.followerCount}
//                             followingCount={data.web.userById.followingCount}
//                         />
//                         {data.web.userSignedIn &&
//                         data.web.userSignedIn._id === data.web.userById._id ? (
//                             <EditProfileSettings
//                                 onClick={() =>
//                                     setShowProfileSettingsModal(true)
//                                 }
//                             />
//                         ) : (
//                             <EditProfileSettings
//                                 style={{ visibility: "hidden" }}
//                             />
//                         )}
//                         {showProfileSettingsModal ? (
//                             <ProfileSettingsModal
//                                 user={data.web.userById}
//                                 onClose={() =>
//                                     setShowProfileSettingsModal(false)
//                                 }
//                             />
//                         ) : (
//                             <></>
//                         )}
//                     </Row>
//                     <Row style={{ height: "60px" }}>
//                         {/* empty space for the profile nav */}
//                     </Row>
//                 </>
//             )}
//             {renderHeaderTab()}
//         </Header>
//     );
// };

// export default ProfileHeaderContainer;
