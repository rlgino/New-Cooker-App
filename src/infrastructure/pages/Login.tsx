import { IonContent, IonHeader, IonPage, IonToolbar, useIonLoading, useIonViewDidEnter } from "@ionic/react"
import './Register.css'
import { useState } from "react"
import { getCurrentUser, signIn } from "../firebase/auth"
import { useHistory } from "react-router"

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
            history.push("/home")
        }).catch((err) => {
            console.log(err)
            alert("Error al loguearse")
        }).finally(() => dismiss())
    }

    return <IonPage>
        <IonHeader translucent>
            <IonToolbar>
                Cree un usuario para sus guardar recetas
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <form className="max-w-md mx-auto form" onSubmit={e => createUser(e)}>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" name="userName" id="floating_email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        value={user.userName} onChange={e => onChange(e)}
                        placeholder=" " required />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="password" id="floating_password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        value={user.password} onChange={e => onChange(e)}
                        placeholder=" " required />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contrasenia</label>
                </div>
                <button type="button"
                    onClick={() => { history.push("/register") }}
                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    Crear usuario
                </button>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ingresar</button>
            </form>
        </IonContent>
    </IonPage>
}

export default LoginPage