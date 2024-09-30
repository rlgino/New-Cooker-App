import { IonContent, IonHeader, IonPage, IonToolbar, useIonLoading, useIonViewDidEnter } from "@ionic/react"
import './Register.css'
import { useState } from "react"
import { getCurrentUser, signIn } from "../firebase/auth"
import { useHistory } from "react-router"
import InputText from "../components/inputText"

const LoginPage: React.FC = () => {
    const [user, setUser] = useState({
        userName: "",
        password: "",
    })
    const history = useHistory();
    /**
     * This example does not make use of the dismiss
     * method returned from `useIonLoading`, but it can
     * be used for more complex scenarios.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [present, dismiss] = useIonLoading();

    useIonViewDidEnter(() => {
        const user = getCurrentUser()
        if (user) history.push("/home")
    }, [])


    const onChange = (e: any): void => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    const createUser = (e: any) => {
        present({
            message: 'Ingresando...',
        });

        e.preventDefault()
        signIn(user.userName, user.password).then(() => {
            setUser({
                userName: user.userName,
                password: ''
            })
            history.push("/home")
        }).catch((err) => {
            console.log(err)
            alert("Error al loguearse")
        }).finally(() => dismiss())
    }

    return <IonPage>
        <IonContent>
            <form className="h-screen flex items-center form" onSubmit={e => createUser(e)}>
                <div className="flex flex-col items-center w-full">
                    <InputText value={user.userName} type="email" onChange={onChange} placeholder="Email" name="userName"/>
                    <InputText value={user.password} type="password" onChange={onChange} placeholder="Contraseña" name="password"/>
                    <button type="button"
                        onClick={() => { history.push("/register") }}
                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Create user
                    </button>
                    <button type="submit" className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary">Login</button>
                </div>
            </form>
        </IonContent>
    </IonPage>
}

export default LoginPage