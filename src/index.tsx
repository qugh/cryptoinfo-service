
import ReactDOM from 'react-dom';
import './assets/styles/index.scss';
import {BrowserRouter as Router} from "react-router-dom";
import AppContainer from "./app";
import './assets/styles/normalize.css'
import {Provider} from "react-redux";
import setupStore from 'redux/store'
const store = setupStore()
ReactDOM.render(

        <Router>
            <Provider store={store}>
                <AppContainer/>
            </Provider>

        </Router>
,
    document.getElementById('root')
);

