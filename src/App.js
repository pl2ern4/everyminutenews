import {ApplicationContext} from "src/context/ApplicationContext";
import HeaderComponent from "src/component/HeaderComponent";
import ContentComponent from "src/component/ContentComponent";

import 'src/styles/index.scss';

function App() {
  return (
    <ApplicationContext>
      <HeaderComponent/>
      <ContentComponent/>
    </ApplicationContext>
  );
}

export default App;
