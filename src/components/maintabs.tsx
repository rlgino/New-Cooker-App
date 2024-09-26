import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react"
import { Redirect, Route } from "react-router"
import Home from "../pages/Home"
import SettingsPage from "../pages/Settings"
import RegisterPage from "../pages/Register"
import CreateReceipt from "../pages/CreateReceipt"
import { add, home, settings } from "ionicons/icons"

const MainTabs: React.FC = () => (<IonTabs>
    <IonRouterOutlet>
        <Redirect exact path="/" to="/home" />
        <Route path="/home" exact={true}>
            <Home />
        </Route>
        <Route path="/settings" exact={true}>
            <SettingsPage />
        </Route>
        <Route path="/register" exact={true}>
            <RegisterPage />
        </Route>
        <Route path="/new-receipt">
            <CreateReceipt />
        </Route>
        <Route path="/new-receipt/:id">
            <CreateReceipt />
        </Route>
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Mis recetas</IonLabel>
        </IonTabButton>

        <IonTabButton tab="new" href="/new-receipt">
            <IonIcon icon={add} />
            <IonLabel>Crear</IonLabel>
        </IonTabButton>

        <IonTabButton tab="settings" href="/settings">
            <IonIcon icon={settings} />
            <IonLabel>Configuraciones</IonLabel>
        </IonTabButton>
    </IonTabBar>
</IonTabs>)

export default MainTabs