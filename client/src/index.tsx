import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import { fetchUser } from './store/actions/user';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { fetchPosts } from './store/actions/post';
const rootNode = document.getElementById('root');

Promise.resolve()
  .then(async () => {
		await store.dispatch(fetchUser());
		// await store.dispatch(fetchPosts());
		
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
      rootNode
    );
  })
  .catch((err) => {
    ReactDOM.render(<div>Error</div>, rootNode);
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
