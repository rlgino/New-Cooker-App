import { User, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from "./firebase";

const auth = getAuth(app)

export const createUserWithEmailAndPass = (user: string, pass: string) => {
    return createUserWithEmailAndPassword(auth, user, pass)
}

export const signIn = (user: string, pass: string) => {
    return signInWithEmailAndPassword(auth, user, pass)
}

export const getCurrentUser = (): User | null => {
    return auth.currentUser
}

export const userSignOut = () => {
    return auth.signOut()
}

export const updateUser = (displayName: string, imageURL: string) => {
    const user = auth.currentUser
    if (!user) return

    return updateProfile(user, {
        displayName: displayName, photoURL: imageURL
    })
}
