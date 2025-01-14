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

const AuthProvider = ({ children }) => {
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
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
