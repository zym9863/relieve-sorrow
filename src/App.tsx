import { Redirect, Route } from 'react-router-dom';
import { 
  IonApp, 
  IonIcon, 
  IonLabel, 
  IonRouterOutlet, 
  IonTabBar, 
  IonTabButton, 
  IonTabs, 
  setupIonicReact 
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { wine, sparkles, home } from 'ionicons/icons';
import Home from './pages/Home';
import GobletOfTime from './pages/GobletOfTime';
import EchoesOfSoul from './pages/EchoesOfSoul';

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

/**
 * 主应用组件 - 解忧应用
 */
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/goblet">
            <GobletOfTime />
          </Route>
          <Route exact path="/echoes">
            <EchoesOfSoul />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>首页</IonLabel>
          </IonTabButton>
          <IonTabButton tab="goblet" href="/goblet">
            <IonIcon icon={wine} />
            <IonLabel>时光酒杯</IonLabel>
          </IonTabButton>
          <IonTabButton tab="echoes" href="/echoes">
            <IonIcon icon={sparkles} />
            <IonLabel>灵魂回响</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
