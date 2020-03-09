import { createStore, combineReducers, applyMiddleware } from "redux";

import { logger, promise } from "./midleware";

import keretaR from "../_reducer/keretaR";
import { dataUser, sigIn, register } from "../_reducer/userR";
import { type } from "../_reducer/typekereta";
import { getPayment } from "../_reducer/paymentR";
import { listOrder, detailOrder } from "../_reducer/orderR";

const reducers = combineReducers({
  keretaR,
  dataUser,
  sigIn,
  type,
  register,
  getPayment,
  listOrder,
  detailOrder
});

const store = createStore(reducers, applyMiddleware(promise, logger));

export default store;
