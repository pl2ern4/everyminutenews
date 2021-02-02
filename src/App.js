import {ApplicationContext} from "./context/ApplicationContext";
import HeaderComponent from "./component/HeaderComponent";
import ContentComponent from "./component/ContentComponent";

import './styles/index.scss';

function App() {
  return (
    <ApplicationContext>
      <HeaderComponent/>
      <ContentComponent/>
    </ApplicationContext>
  );
}

export default App;
