import { User, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from "./firebase";

const auth = getAuth(app)

export const createUserWithEmailAndPass = (user: string, pass: string) => {
    return createUserWithEmailAndPassword(auth, user, pass)
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

export const updateUser = (displayName: string, imageURL: string) => {
    const user = getCurrentUser()
    if (!user) return

    return updateProfile(user, {
        displayName: displayName, photoURL: imageURL
    })
}
