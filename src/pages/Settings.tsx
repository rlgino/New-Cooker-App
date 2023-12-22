import { updateCurrentUser } from "@firebase/auth"
import { IonAvatar, IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react"
import { updateUser } from "../app/auth"

const SettingsPage: React.FC = () => {

    const update = () => {
        updateUser("Gino Luraschi", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Boca_Juniors_logo18.svg/1200px-Boca_Juniors_logo18.svg.png")
    }

    return <IonPage>
        <IonHeader translucent>
            <IonToolbar className="p-1">
                Configuracion de la cuenta
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <form className="max-w-md mx-auto p-6" onSubmit={() => update()} >
                <div className="w-full flex justify-center">
                    <IonAvatar aria-hidden="true">
                        <img alt="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Boca_Juniors_logo18.svg/1200px-Boca_Juniors_logo18.svg.png" />
                    </IonAvatar>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
                    </div>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </IonContent>
    </IonPage >
}

export default SettingsPage