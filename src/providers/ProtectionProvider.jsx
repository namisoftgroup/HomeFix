import { setShowAuthModal } from "../redux/slices/showAuthModal";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import useAuth from "./../hooks/useAuth";
import AuthModal from "./../ui/modals/AuthModal";

function ProtectionProvider({ children }) {
  const dispatch = useDispatch();
  const { loading, isAuthed } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthed) {
      dispatch(setShowAuthModal(true));
    }
  }, [dispatch, isAuthed, loading]);

  if (loading) {
    return null;
  }

  return (
    <>
      {isAuthed ? children : null}
      <AuthModal />
    </>
  );
}

export default ProtectionProvider;
