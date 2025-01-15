import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AuthContext from "../contexts/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const userInfo = {
    user,
    loading,
    setLoading,
    handelUserLogin,
    handelUserRegister,
    handelUserProfile,
    handelUserLogout,
    handelGoogleLogin,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        // Get token and store on clint local storage
        const userInfo = { email: currentUser?.email };
        axiosPublic
          .post("/api/jwt", userInfo)
          .then((result) => {
            if (result?.data?.token) {
              localStorage.setItem("access-token", result?.data?.token);
            }
          })
          .catch((error) => console.log(error));
      } else {
        setUser(null);
        setLoading(false);
        // Remove token if user is logged out
        localStorage.removeItem("access-token");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);

  function handelUserLogin(email, password) {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  function handelUserRegister(email, password) {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function handelUserLogout() {
    setLoading(true);
    return signOut(auth);
  }

  function handelUserProfile(info) {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: info.name,
      photoURL: info.photo,
    });
  }

  function handelGoogleLogin() {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  }

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};

export default AuthProvider;
