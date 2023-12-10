import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppNavbar from '../Navbar';
import { auth, db } from '../../firebase';
import { getDocs, collection } from 'firebase/firestore';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [authId, setAuthId] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setAuthId(authUser.uid);

      if (!authUser) {
        // If no user is logged in, redirect to login
        navigate('/');
      }
      fetchUserData();
    });

    const fetchUserData = async () => {
      try {
        const queryUsers = await getDocs(collection(db, 'users'));
        queryUsers.forEach((doc) => {
          var u = doc.data();
          if (u.authId === authId){
            setUserData(u);
          }
        });
      } catch (error) {
        alert(error);
        console.error(error);
      }
    };

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  if (!user) {
    // Testblock (Should not come to here)
    return null;
  }

  return (
    <div>
      <AppNavbar />

      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '110px' }}>
                    <img
                      src="https://images.pexels.com/photos/18466844/pexels-photo-18466844/free-photo-of-fashion-sunglasses-people-woman.jpeg"
                      alt="Profile Image"
                      className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: '150px', zIndex: 1 }}
                    />
                    <Link to="/editProfile" className="btn btn-outline-dark" style={{ zIndex: 1 }}>
                      Edit profile
                    </Link>
                  </div>
                  <div className="container py-5" style={{ marginTop: '30px' }}>
                    {userData ? (
                      <div>
                        <h2>Name: {userData.name}</h2>
                        <p></p>
                        <h6>location: {userData.location}</h6>
                        <h6>role: {userData.role} </h6>
                      </div> 
                    ) : (
                      <p>Loading user data...</p>
                    )}
                  </div>
                  
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="d-flex justify-content-end text-center py-1">
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <ProfileSection title="Bio">
                    {userData ? (
                      <div>
                        <p className="font-italic mb-1">
                          {userData.bio}
                        </p>
                      </div> 
                    ) : (
                      <p>Loading user data...</p>
                    )}
                  </ProfileSection>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProfileSection = ({ title, children }) => (
  <div className="mb-5">
    <p className="lead fw-normal mb-1">{title}</p>
    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
      {children}
    </div>
  </div>
);

const renderPhotos = (photoUrls) =>
  photoUrls.map((url, index) => (
    <div className="col mb-2" key={index}>
      <img src={url} alt={`Image ${index + 1}`} className="w-100 rounded-3" />
    </div>
  ));

export default Profile;
