import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonTabs, IonRouterOutlet, setupIonicReact, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import CreateReceipt from './pages/CreateReceipt'
import "./App.css"

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/tailwind.css';
import { add, home, settings } from 'ionicons/icons';
import SettingsPage from './pages/Settings';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import { subscribeToUserChange } from './firebase/auth';
import { useState } from 'react';

setupIonicReact();

const App: React.FC = () => {
  const [userNotLogged, setUserNotLogged] = useState(false)
  subscribeToUserChange((userLogged: boolean)=> {
    setUserNotLogged(!userLogged)
  })
  
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/" exact={true}>
              {
                userNotLogged ? <Redirect to="/login" /> : <Redirect to="/home" />
              }
            </Route>
            <Route path="/home" exact={true}>
              <Home />
            </Route>
            <Route path="/settings" exact={true}>
              <SettingsPage />
            </Route>
            <Route path="/login" exact={true}>
              <LoginPage />
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
  
          <IonTabBar slot="bottom" hidden={userNotLogged}>
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
        </IonTabs>
      </IonReactRouter>
    </IonApp >
  )
};

export default App;
