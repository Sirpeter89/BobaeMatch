import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import configureStore from './store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="backgrounds"></div>
      <App className="test"/>
      <div className="dev-bar">
        <div className="developedBy">
            Brought To You By: &nbsp; <a className="dev-name" href="https://sirpeter89.github.io/#" target="_blank">Justin Wong</a>
            {/* <a href="https://github.com/Sirpeter89">Github</a> */}
        </div>
        <a className="link" href="https://github.com/Sirpeter89" target="_blank">
          <FontAwesomeIcon className="git-icon"  icon={faGithub} />
        </a>
        <a className="link" href="https://www.linkedin.com/in/justin-wong-29a247217/" target="_blank">
          <FontAwesomeIcon className="git-icon"  icon={faLinkedin} />
        </a>
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
