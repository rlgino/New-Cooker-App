import { IonContent, IonHeader, IonPage, IonToolbar, useIonViewDidEnter, useIonViewWillEnter } from "@ionic/react"
import './Register.css'
import { useActionState, } from "react"
import { createUserWithEmailAndPass, getCurrentUser } from "../firebase/auth"
import { useHistory } from "react-router"
import InputText from "../components/inputText"
import Loading from "../components/Loading"

const RegisterPage: React.FC = () => {
    const history = useHistory();
    const [error, submitAction, isPending] = useActionState(
        async (_: any, formData: any) => {
            if (formData.get("password") !== formData.get("secondPassword"))
                return new Error("Las contrasenias deben coincidir")
            try {
                await createUserWithEmailAndPass(formData.get("userName"), formData.get("password"));
                history.push("/login")
                return null;
            } catch (error) {
                const msg = error + ''
                if (msg.indexOf("email-already-in-use") > -1) {
                    return new Error("The email address is already in use");
                }
                console.error(msg);
                return new Error('Unexpected error');
            }
        },
        null,
    );

    useIonViewDidEnter(() => {
        const user = getCurrentUser()
        if (user) history.push("/home")
    }, [])

    return <IonPage>
        <IonHeader translucent>
            <IonToolbar>
                Create your user
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <form className="max-w-md mx-auto form flex flex-col items-center w-full" action={submitAction}>
                <Loading />
                <div className="relative z-0 w-full">
                    <InputText type="text" placeholder="Email" name="userName" />
                </div>
                <div className="relative z-0 w-full">
                    <InputText type="password" placeholder="Password" name="password" />
                </div>
                <div className="relative z-0 w-full">
                    <InputText type="password" placeholder="Repeat password" name="secondPassword" />
                </div>
                {
                    error &&
                    <div className="text-red-500 text-sm text-center w-full">
                        {error + ''}
                    </div>
                }
                <button type="button"
                    onClick={() => { history.push("/login") }}
                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                    Go to Login
                </button>
                {
                    isPending ?
                        <div className="text-center">Loading...</div> :
                        <button type="submit" className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                            Create
                        </button>
                }
            </form>
        </IonContent>
    </IonPage>
}

export default RegisterPage