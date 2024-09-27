import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonLoading, IonModal, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from "@ionic/react"
import { getCurrentUser, registerPhoneNumber, renderRecaptcha, updateUser, validateOtp } from "../firebase/auth"
import { useState } from "react"
import { useHistory } from "react-router"
import { uploadProfileImage } from "../firebase/storage"
import { defaultImage } from "../domain/default"
import { updateNumber } from "../firebase/database"
import InputText from "../components/inputText"

const SettingsPage: React.FC = () => {
    const [uid, setUid] = useState("")
    const [userName, setUserName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [oldNumber, setOldNumber] = useState("")
    const [email, setEmail] = useState("")
    const [saving, setSaving] = useState(false)
    const [imgUrl, setImgUrl] = useState(defaultImage)
    const history = useHistory()

    const [otp, setOtp] = useState("")
    const [phoneValidated, setPhoneValidated] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useIonViewDidEnter(() => {
        const user = getCurrentUser()
        if (!user) {
            history.push("/register")
            return
        }

        renderRecaptcha('sign-in-button', () => { console.log("Validating OTP") })
        setUid(user.uid)
        setUserName(user.displayName ? user.displayName : "")
        setEmail(user.email ? user.email : "")
        setPhoneNumber(user.phoneNumber ? user.phoneNumber : "")
        setOldNumber(user.phoneNumber ? user.phoneNumber : "")
        setImgUrl(user.photoURL ? user.photoURL : imgUrl)
        setPhoneValidated(user.phoneNumber && user.phoneNumber !== "" ? true : false)
    }, [])

    const changeProfileImage = () => {
        document.getElementById('user_avatar')?.click()
    }

    const onFileChange = (fileChangeEvent: any) => {
        setSaving(true)
        uploadProfileImage(fileChangeEvent.target.files[0], uid).then((url) => {
            setImgUrl(url)
        }).catch((err) => {
            console.log(err)
            alert("Error cargando imagen")
        }).finally(() => setSaving(false))
    };

    const openOtpModal = () => {
        registerPhoneNumber(phoneNumber ? phoneNumber : "").then(() => {
            setIsOpen(true)
        }).catch(err => {
            console.error(err)
            alert("Hubo un error al validar su telefono")
        })
    }

    const update = async (e: any) => {
        e.preventDefault()

        if (!phoneValidated) {
            openOtpModal()
            return
        }
        saveUser()
    }

    const saveUser = () => {
        setSaving(true)
        updateUser(userName, imgUrl).then(() => setSaving(false))
    }

    const validateCode = () => {
        validateOtp(otp).then(() => {
            setIsOpen(false)
            setPhoneValidated(true)
            updateNumber(uid, phoneNumber, oldNumber)
        }).catch(e => {
            console.error(e)
            alert("Error al validar el usuario")
        })
    }

    const disabledClass = "bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
    const enabledClass = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    return <IonPage>
        <IonHeader translucent>
            <IonToolbar className="p-1">
                Configuracion de la cuenta
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <form className="max-w-md mx-auto p-6" onSubmit={(e) => update(e)} >
                <IonLoading isOpen={saving} />
                <div className="w-full flex justify-center mb-5">
                    <IonAvatar aria-hidden="true" onClick={changeProfileImage}>
                        <img alt="" src={imgUrl} />
                    </IonAvatar>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <InputText name="floating_user_name" value={userName} onChange={(e: any) => setUserName(e.target.value)} type='text' />
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <InputText name="floating_user_email" value={email} onChange={(e: any) => setEmail(e.target.value)} type='email' />
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="floating_phone_number" id="floating_phone_number" disabled={phoneValidated}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
                            placeholder=" " required />
                    </div>
                </div>
                <div id="sign-in-button"></div>
                <button type="button" onClick={() => openOtpModal()} disabled={phoneValidated || phoneNumber === "" || phoneNumber.length < 10}
                    className={phoneValidated || phoneNumber === "" || phoneNumber.length < 10 ? disabledClass : enabledClass}>
                    Validar numero
                </button>

                <IonModal isOpen={isOpen}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Validando su numero</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="floating_otp" id="floating_otp"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    value={otp} onChange={e => setOtp(e.target.value)}
                                    placeholder=" " required />
                                <label htmlFor="floating_otp" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Codigo OTP
                                </label>
                            </div>
                        </div>
                        <button type="button" onClick={() => validateCode()}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Enviar codigo
                        </button>
                    </IonContent>
                </IonModal>

                <input className="invisible block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    onChange={(ev) => onFileChange(ev)} accept="image/png, image/gif, image/jpeg" 
                    aria-describedby="user_avatar_help" id="user_avatar" type="file" />

                <button type="submit"
                    disabled={saving}
                    className="bg-primary bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {saving ? "Guardando" : "Guardar"}
                </button>
            </form>
        </IonContent>
    </IonPage >
}

export default SettingsPage