import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import NavbarMobile from "../components/navbar/navbarMobile";
import Products from "../pages/Products/Products";
import {db} from '../firebase';
import {useAuth} from '../contexts/AuthContext';
function Home() {
  const [mobile, setMobile] = useState();
const {currentUser} = useAuth();
  useEffect(() => {

    const isMobile = window.matchMedia(
      "only screen and (max-width: 760px)"
    ).matches;
    if (isMobile) setMobile(true);
    console.log(mobile);
    if(currentUser) {
    const docRef =  db.collection('users').doc(currentUser.uid)
    docRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
       docRef.onSnapshot((doc) => {
         
        });
      } else {
        if(localStorage.getItem('email')) {
        docRef.set({email:localStorage.getItem('email'),
      phone:localStorage.getItem('phone'),
      firstName:localStorage.getItem('firstName'),
      secondName:localStorage.getItem('secondName'),
      county:localStorage.getItem('county'),
      city: localStorage.getItem('city'),
      postalCode:localStorage.getItem('postalCode'),
      street:localStorage.getItem('street'),

      
    });
        } // create the document
      }
  });
  }
  }, []);
  return (
    <>
      {mobile ? (
        <>
          <NavbarMobile />
          {//<Sidebar />//
          }
          <Products/>
        </>
      ) : (
        <>
          <Navbar />
          <div style= {{display: "flex",
  justifyContent: "space-arround",position: "relative"}}>
          {//*<Sidebar />*//
          }
    
          <Products/>
        
          </div>
        </>
      )}
    </>
  );
}

export default Home;
