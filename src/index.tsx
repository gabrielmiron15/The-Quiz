import React from 'react';
import ReactDOM from 'react-dom';
import './components/index.scss';
import HomePage from './components/Homepage';
import reportWebVitals from './reportWebVitals';
import Quiz from './components/Quiz';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Provider from './store/Provider';

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(
  <React.Fragment>
    <Provider>
      <Router>
        <Switch>
          <Route exact path="/quiz">
            <Quiz />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
