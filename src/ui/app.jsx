import React from 'react';
import Router from 'react-router';

//var Route = Router.Route;import { Route, DefaultRoute, RouteHandler, Link } from Router;//'react-router';
var { Route, DefaultRoute, RouteHandler, Link } = Router;

export class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('here');
    this.state = {states: findStates()};
    console.log('here2');
  }
  render() {
    console.log('rendering app')
    var links = this.state.states.map(function (state) {
      return (
        <li key={state.abbr}>
          <Link
            to="state"
            params={{ abbr: state.abbr }}
          >{state.name}</Link>
        </li>
      );
    });
    return (
      <div className="App">
        <ul className="Master">
          {links}
        </ul>
        <div className="Detail">
          <RouteHandler/>
        </div>
      </div>
    );
  }
}
App.defaultProps = {};

export class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('rendering index')
    return <p>Select a state from the left</p>;
  }
}
Index.defaultProps = {};

export class State extends React.Component {
  constructor(props) {
    super(props);
  }

  //mixins: [ Router.State ],

  imageUrl(name) {
    return "http://www.50states.com/maps/" + underscore(name) + ".gif";
  }

  render() {
    console.log('rendering state')
    var unitedState = findState("AK");//this.getParams().abbr);
    return (
      <div className="State">
        <h1>{unitedState.name}</h1>
        <img src={this.imageUrl(unitedState.name)}/>
      </div>
    );
  }
}

State.defaultProps = {};

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Index}/>
    <Route name="state" path="state/:abbr" handler={State}/>
  </Route>
);
console.log('loading');
Router.run(routes, function (Handler) {
  console.log('running');
  React.render(<Handler/>, document.getElementById('main'));
});

/*****************************************************************************/
// data stuff

function findState(abbr) {
  var states = findStates();
  for (var i = 0, l = states.length; i < l; i ++) {
    if (states[i].abbr === abbr) {
      return states[i];
    }
  }
}

function findStates() {
  return [
    { abbr: "AL", name: "Alabama"},
    { abbr: "AK", name: "Alaska"},
    { abbr: "AZ", name: "Arizona"},
    { abbr: "AR", name: "Arkansas"},
    { abbr: "CA", name: "California"},
    { abbr: "CO", name: "Colorado"},
    { abbr: "CT", name: "Connecticut"},
    { abbr: "DE", name: "Delaware"},
    { abbr: "FL", name: "Florida"},
    { abbr: "GA", name: "Georgia"},
    { abbr: "HI", name: "Hawaii"},
    { abbr: "ID", name: "Idaho"},
    { abbr: "IL", name: "Illinois"},
    { abbr: "IN", name: "Indiana"},
    { abbr: "IA", name: "Iowa"},
    { abbr: "KS", name: "Kansas"},
    { abbr: "KY", name: "Kentucky"},
    { abbr: "LA", name: "Louisiana"},
    { abbr: "ME", name: "Maine"},
    { abbr: "MD", name: "Maryland"},
    { abbr: "MA", name: "Massachusetts"},
    { abbr: "MI", name: "Michigan"},
    { abbr: "MN", name: "Minnesota"},
    { abbr: "MS", name: "Mississippi"},
    { abbr: "MO", name: "Missouri"},
    { abbr: "MT", name: "Montana"},
    { abbr: "NE", name: "Nebraska"},
    { abbr: "NV", name: "Nevada"},
    { abbr: "NH", name: "New Hampshire"},
    { abbr: "NJ", name: "New Jersey"},
    { abbr: "NM", name: "New Mexico"},
    { abbr: "NY", name: "New York"},
    { abbr: "NC", name: "North Carolina"},
    { abbr: "ND", name: "North Dakota"},
    { abbr: "OH", name: "Ohio"},
    { abbr: "OK", name: "Oklahoma"},
    { abbr: "OR", name: "Oregon"},
    { abbr: "PA", name: "Pennsylvania"},
    { abbr: "RI", name: "Rhode Island"},
    { abbr: "SC", name: "South Carolina"},
    { abbr: "SD", name: "South Dakota"},
    { abbr: "TN", name: "Tennessee"},
    { abbr: "TX", name: "Texas"},
    { abbr: "UT", name: "Utah"},
    { abbr: "VT", name: "Vermont"},
    { abbr: "VA", name: "Virginia"},
    { abbr: "WA", name: "Washington"},
    { abbr: "WV", name: "West Virginia"},
    { abbr: "WI", name: "Wisconsin"},
    { abbr: "WY", name: "Wyoming"}
  ];
}

function underscore(str) {
  return str.toLowerCase().replace(/ /, '_');
}
