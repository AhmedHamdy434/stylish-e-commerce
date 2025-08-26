import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  validatePassword,
} from "firebase/auth";
import { auth, db, googleProvider } from "./config";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface AuthResponse {
  success: boolean;
  message?: string;
}

const emptyValidation = (email: string, password: string) => {
  if (!email || !password) return "Please input all required inputs";
};
// Password Validation
const passwordValidation = async (password: string) => {
  let passwordErrorMessage = "";
  const status = await validatePassword(auth, password); //check valid password
  if (!status.isValid) {
    if (!status.containsLowercaseLetter)
      passwordErrorMessage = "Password needs at least one lowerCase character";
    else if (!status.containsNumericCharacter)
      passwordErrorMessage =
        "Password is too short , it should be 8 character or more";
    else if (!status.containsUppercaseLetter)
      passwordErrorMessage = "Needs at least one upperCase character";
    else if (!status.meetsMinPasswordLength)
      passwordErrorMessage = "Needs at least one number character";
    return passwordErrorMessage;
  }
};

// 1. Email/Password Sign Up
export const registerWithEmail = async (
  email: string,
  password: string,
  confirmPassword: string,
  userName: string,
  role: string
): Promise<AuthResponse> => {
  try {
    const cleanEmail = email.trim();
    const empty = emptyValidation(cleanEmail, password);
    if (empty) return { success: false, message: empty };

    const passUnValid = await passwordValidation(password);
    if (passUnValid) return { success: false, message: passUnValid };
    if (password !== confirmPassword)
      return { success: false, message: "password does not match" };
    const userCred = await createUserWithEmailAndPassword(
      auth,
      cleanEmail,
      password
    );
    await updateProfile(userCred.user, { displayName: userName });
    const ref = doc(
      db,
      "users",
      userCred.user.uid,
      "userDetails",
      userCred.user.uid
    );

    await setDoc(ref, {
      uid: userCred.user.uid,
      email: cleanEmail,
      userName,
      role,
      createdAt: new Date(),
    });
    return { success: true, message: "Sign up is successed" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "There is an Error in Sign Up",
    };
  }
};

// 2. Email/Password Sign In
export const loginWithEmail = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const cleanEmail = email.trim();
    await signInWithEmailAndPassword(auth, cleanEmail, password);
    return { success: true, message: "Sign in is successed" };
  } catch {
    return { success: false, message: "There is an Error in Sign In" };
  }
};

// 3. Logout
export const logout = async (): Promise<AuthResponse> => {
  try {
    await signOut(auth);
    return { success: true, message: "log out is successed" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
export const signInWithGoogle = async (
  role: "seller" | "buyer"
): Promise<AuthResponse> => {
  try {
    const userCred = await signInWithPopup(auth, googleProvider);
    const user = userCred.user;

    // 2. Check if user already exists in Firestore
    const ref = doc(db, "users", user.uid, "userDetails", user.uid);

    const snap = await getDoc(ref);

    if (!snap.exists()) {
      // 3. New user → create Firestore doc
      await setDoc(ref, {
        uid: user.uid,
        email: user.email,
        userName: user.displayName || "No Name",
        role,
        createdAt: new Date(),
      });
    } else {
      // 4. Existing user → optionally update role/displayName
      await setDoc(
        ref,
        {
          userName: user.displayName || "No Name",
          role,
        },
        { merge: true }
      );
    }

    return { success: true, message: "Google sign-in success" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Google sign-in failed",
    };
  }
};
