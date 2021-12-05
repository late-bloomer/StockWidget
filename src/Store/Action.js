import axios from "axios";

const API_KEY = "52YUXC41HW1V6ZMT"; // key 1
//const API_KEY = "7ZUC73CPZOKIAFX7"; // key 2

const stockAPIS = {
  SYMBOL_SEARCH_URL:
    "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=",
  GET_STOCK_DETAILS_URL:
    "https://www.alphavantage.co/query?function=OVERVIEW&symbol=",
};

export function getAllSymbols(
  keywords = "",
  callbackSuccess = () => {},
  callbackError = () => {}
) {
  let currentURL =
    stockAPIS.SYMBOL_SEARCH_URL + keywords + "&apikey=" + API_KEY;
  axios
    .get(currentURL)
    .then((res) => {
      const { data: { bestMatches = [] } = {} } = res;
      callbackSuccess(bestMatches);
    })
    .catch((err) => {
      callbackError(err);
    });
}

export function getSymbolStockDetails(
  symbol = "",
  callbackSuccess = () => {},
  callbackError = () => {}
) {
  let currentURL =
    stockAPIS.GET_STOCK_DETAILS_URL + symbol + "&apikey=" + API_KEY;
  axios
    .get(currentURL)
    .then((res) => {
      const { data = {} } = res;
      callbackSuccess(data);
    })
    .catch((err) => {
      callbackError(err);
    });
}
