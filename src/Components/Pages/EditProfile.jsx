import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDocs, collection, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../Navbar';

function EditProfile() {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        // If no user is logged in, redirect to login
        navigate('/');
      }

      fetchUserData(authUser.uid);
    });

    const fetchUserData = async (authId) => {
      try {
        const documents = await getDocs(collection(db, 'users'));
        documents.forEach((document) => {
          const data = document.data();
          const id = document.id;
          if (data.authId === authId){
            setName(data.name);
            setLocation(data.location);
            setBio(data.bio);
            setUserId(id);
          }
        });
      } catch (error) {
        alert(error);
        console.error(error);
      }
    };

    return () => {
      fetchData();
    };
  }, [navigate]);

  const handleSave = async () => {
    try {
     const userRef = doc(db, 'users', userId);
     await updateDoc(userRef, {
        name,
        location,
        bio,
     });
    } catch (error) {
     console.error ('Error updating userId:', userId);
     console.error(error);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <AppNavbar />


      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">



          <h1>Edit Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                value={location}
                onChange={handleLocationChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bio" className="form-label">Bio</label>
              <textarea
                className="form-control"
                id="bio"
                value={bio}
                onChange={handleBioChange}
              />
            </div>
            <button type="button" onClick={handleSave} className="btn btn-primary">Save</button>
          </form>


        </div>
        </div>
        </div>
        </section>

      </div>
  );
}

export default EditProfile;
