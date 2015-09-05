import {
  parse as parseUrl,
} from "url";

import {
  default as React,
  Component,
  PropTypes,
} from "react";

import {
  AppBar,
} from "material-ui";

import {default as InitializeContainer} from "./InitializeContainer";
import {default as MainPageContainer} from "./MainPageContainer";
import {default as CollectDataStageContainer} from "./CollectDataStageContainer";

require("normalize.css");

const containerByStage = {
  0: InitializeContainer,
  1: MainPageContainer,
  2: CollectDataStageContainer,
};
var country_list = require( 'iso-3166-country-list');
const COUNTRY_LIST =
  country_list.names;

const STORE_LIST = [
  "BC",
  "LB",
  "AP",
];
export default class StageChangeContainer extends Component {

  static contextTypes = {
    muiTheme: PropTypes.object,
  }

  state = {
    stage: 0,
    /*manufactures: null,
    devices: null,*/
    brandDeviceList: null,
  }
 
  handleDataLoaded = (brandDeviceList) => {
    this.setState({
        stage: 1, 
        brandDeviceList,
    });
  }

  handleAddClicked = () => {
    this.setState({
      stage: 2,
    });
  }

  handleHomeClicked = () => {
    this.setState({
      stage: 1,
    });
  }

  handleDeviceCreated = (deviceObjFromServer) => {
    console.log("Created!", deviceObjFromServer);

    this.setState({
      stage: 1,
    });
  }  
  render () {
    const Component = containerByStage[this.state.stage] || InitializeContainer;

    return (
      <div id="react-root">
        <AppBar
          //title="(Locarise Logo)"
          title = {
            <img 
              style={{height: "60px"}}
              src={require("../images/logo_locarise_inline_retina.png")}
            />
          }
          showMenuIconButton = {false}
        />
        <div style={{ height: "20px"}} />
        <Component
          onDataLoaded={this.handleDataLoaded}
          onAddClicked={this.handleAddClicked}
          //manufactures={this.state.manufactures}
          countries={COUNTRY_LIST}
          stores={STORE_LIST}
          //devices={this.state.devices}
          brandDeviceList={this.state.brandDeviceList}
          onDeviceCreated={this.handleDeviceCreated}
          onHomeClicked={this.handleHomeClicked}
        />
      </div>
    );
  }
}
