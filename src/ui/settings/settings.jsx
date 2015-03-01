import React from 'react';
import Reflux from 'reflux';

//import {SettingsStore, SettingsActions} from "../../model/game/game-store";

export class SettingsView extends React.Component {

   constructor(props) {
      super(props);

      // this.state = SettingsStore.currentState();
      //
      // // Registers a callback for game updates
      // SettingsStore.listen((state) => {
      //    this.setState(state);
      //    //this.forceUpdate();
      // });
   }

   componentDidMount() {
      console.log('mounted settings');
   }

   render() {
      console.log('rendering setings');
      return <h1>Settings</h1>;
   }
}
