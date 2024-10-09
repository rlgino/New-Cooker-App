import { IonContent, IonHeader, IonPage, IonToolbar, useIonViewDidEnter, useIonViewWillEnter } from "@ionic/react"
import './Register.css'
import { useState } from "react"
import { createUserWithEmailAndPass, getCurrentUser } from "../firebase/auth"
import { useHistory } from "react-router"
import InputText from "../components/inputText"

const RegisterPage: React.FC = () => {
    const [user, setUser] = useState({
        userName: "",
        password: "",
        secondPassword: ""
    })
    const history = useHistory();

    useIonViewDidEnter(() => {
        const user = getCurrentUser()
        if (user) history.push("/home")
    }, [])

    const onChange = (e: any): void => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    const createUser = (e: any) => {
        e.preventDefault()
        if (user.password !== user.secondPassword)
            alert("Las contrasenias deben coincidir")
        createUserWithEmailAndPass(user.userName, user.password).then(() => {
            history.push("/login")
        })
    }

    return <IonPage>
        <IonHeader translucent>
            <IonToolbar>
                Create your user
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <form className="max-w-md mx-auto form flex flex-col items-center w-full" onSubmit={e => createUser(e)}>
                <div className="relative z-0 w-full">
                    <InputText value={user.userName} type="email" onChange={onChange} placeholder="Email" name="userName" />
                </div>
                <div className="relative z-0 w-full">
                    <InputText value={user.password} type="password" onChange={onChange} placeholder="Password" name="password" />
                </div>
                <div className="relative z-0 w-full">
                    <InputText value={user.secondPassword} type="password" onChange={onChange} placeholder="Repeat password" name="secondPassword" />
                </div>
                <button type="button"
                    onClick={() => { history.push("/login") }}
                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                    Go to Login
                </button>
                <button type="submit" className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Create</button>
            </form>
        </IonContent>
    </IonPage>
}

export default RegisterPage