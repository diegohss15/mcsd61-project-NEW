import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppNavbar from '../Navbar';
import { auth } from '../../firebase';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);

      if (!authUser) {
        // If no user is logged in, redirect to signup
        navigate('/signup');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  if (!user) {
    // This block should not be reached because the redirect happens in the useEffect
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
                  <div className="ms-3" style={{ marginTop: '130px' }}>
                    <h5>Name: Mary Jane</h5>
                    <p>New York</p> 
                  </div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <p className="mb-1 h5">253</p>
                      <p className="small text-muted mb-0">Photos</p>
                    </div>
                    <div className="px-3">
                      <p className="mb-1 h5">1026</p>
                      <p className="small text-muted mb-0">Followers</p>
                    </div>
                    <div>
                      <p className="mb-1 h5">478</p>
                      <p className="small text-muted mb-0">Following</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <ProfileSection title="Skills">
                    <p className="font-italic mb-1">Web Developer</p>
                    <p className="font-italic mb-1">Lives in New York</p>
                    <p className="font-italic mb-0">Photographer</p>
                  </ProfileSection>
                  <ProfileSection title="Bio">
                    <p className="font-italic mb-1">
                      When I'm not immersed in the tech world, you'll find me hiking in the great outdoors, exploring new
                      cuisines, and mentoring aspiring tech professionals. I believe in a work-life balance that fuels
                      creativity and personal growth.
                    </p>
                  </ProfileSection>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0">Recent photos</p>
                    <p className="mb-0">
                      <a href="#!" className="text-muted">
                        Show all
                      </a>
                    </p>
                  </div>
                  <div className="row g-2">
                    {renderPhotos([
                      'https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp',
                      'https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp',
                    ])}
                  </div>
                  <div className="row g-2">
                    {renderPhotos([
                      'https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp',
                      'https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp',
                    ])}
                  </div>
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
