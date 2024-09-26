import { PhoneAuthProvider, RecaptchaVerifier, User, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, updatePhoneNumber, updateProfile } from "firebase/auth";
import app from "./firebase";

const auth = getAuth(app)

export const createUserWithEmailAndPass = (user: string, pass: string) => {
    return createUserWithEmailAndPassword(auth, user, pass)
}

let verifier: RecaptchaVerifier
let verificationID: string

export const renderRecaptcha = (componentName: string, callback: any) => {
    if (verifier) return
    verifier = new RecaptchaVerifier(auth, componentName, {
        size: 'invisible',
        callback: callback,
    });
    verifier.render();
}

export const registerPhoneNumber = async (phoneNumber: string) => {
    const provider = new PhoneAuthProvider(auth);
    verificationID = await provider.verifyPhoneNumber(phoneNumber, verifier)
}

export const validateOtp = (otp: string) => {
    const user = auth.currentUser
    return updatePhoneNumber(user!, PhoneAuthProvider.credential(verificationID, otp));
}

export const signIn = async (user: string, pass: string) => {
    const credentials = await signInWithEmailAndPassword(auth, user, pass)
    localStorage.setItem('user', JSON.stringify(credentials.user))
}

export const getCurrentUser = (): User | null => {
    const user = localStorage.getItem('user')
    if (!user) return null
    return JSON.parse(user) as User
}

export const userSignOut = () => {
    localStorage.clear()
    return auth.signOut()
}

export const updateUser = async (displayName: string, imageURL: string) => {
    const user = auth.currentUser
    if (!user) return

    await updateProfile(auth.currentUser, {
        displayName: displayName, photoURL: imageURL
    })
    localStorage.setItem('user', JSON.stringify(auth.currentUser))
}

export const subscribeToUserChange = (setUserLogged: any) => {
    onAuthStateChanged(auth, (user)=> {
        setUserLogged(user !== null)
    })
}
