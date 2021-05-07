import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducer';
import logger from 'redux-logger';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
      const { composeWithDevTools } = require("redux-devtools-extension");
      return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }) => {
  if (isServer) {
      return createStore(rootReducer, bindMiddleware([thunkMiddleware]));
  } else {
      const { persistStore, persistReducer } = require("redux-persist");
      const storage = require("redux-persist/lib/storage").default;

      const persistConfig = {
          key: "nextjs",
          whitelist: ["global"],
          storage,
      };

      const persistedReducer = persistReducer(persistConfig, rootReducer);

      const store = createStore(
          persistedReducer,
          {},
          bindMiddleware([thunkMiddleware])
      );

      store.__persistor = persistStore(store);

      return store;
  }
};

export const wrapper = createWrapper(makeStore);