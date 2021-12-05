import React, { useState, useEffect } from "react";
import SearchBar from "../ReusableComponents/SearchBar";
import StockDetails from "./StockDetails/StockDetails";
import { withStyles } from "@mui/styles";
import { getAllSymbols, getSymbolStockDetails } from "../../Store/Action";
import { debounce, isEmpty } from "lodash";
import { findDeleteUtilsStock, extractSymbolArr } from "../../Utils/Utils";
import { styled } from "@mui/material/styles";

const CLEAR = "clear";
const CREATE_OPTION = "createOption";
const REMOVE_OPTION = "removeOption";
const SELECT_OPTION = "selectOption";

var timer;
var refreshTimer;

const Root = styled("div")(({ theme }) => ({
  padding: "2rem 4rem",
  [theme.breakpoints.down("sm")]: {
    padding: "2rem",
  },
}));
const styles = (theme) => ({
  stockPickerWidgetContainer: {
    position: "relative",
  },
});

function StockPickerWidget({ classes }) {
  const [symbolList, setSymbolList] = useState([]);
  const [err, setErr] = useState(null);
  const [open, setOpen] = useState(false);
  const [stockDataList, setStockDataList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNoOptions, setIsNoOptions] = useState(false);

  useEffect(() => {
    pollingData();
    return () => {
      clearInterval(refreshTimer);
    };
  }, []);

  const pollingData = () => {
    refreshTimer = setInterval(() => {
      setStockDataList((prevList) => {
        let tempPreList = [...prevList];
        const symbolArr = extractSymbolArr(tempPreList);
        for (let index = 0; index < symbolArr.length; index++) {
          polGetDataAndUpdateStockDetails(
            symbolArr[index],
            index,
            (detailsObj) => {
              tempPreList[index] = detailsObj;
              return tempPreList;
            }
          );
        }
        return prevList;
      });
    }, 60 * 1000);
  };

  const polGetDataAndUpdateStockDetails = (symbol, index, callback) => {
    getSymbolStockDetails(
      symbol,
      (details) => {
        if (!isEmpty(details)) {
          setOpen(false);
          callback(details);
        } else {
          let tempObj = { Symbol: symbol.toUpperCase() };
          setOpen(false);
          callback(tempObj);
        }
      },
      (err) => {}
    );
  };

  const handleOnChangeAutoComplete = (options, reason) => {
    let selectedOption =
      options && options.length > 0
        ? options[options.length - 1].toUpperCase()
        : "";
    switch (reason) {
      case CREATE_OPTION: {
        // press enter
        if (selectedOption && selectedOption !== "") {
          createOptionHandler(selectedOption);
        }
        break;
      }
      case SELECT_OPTION: {
        // selection options from option list
        selectOptionHandler(selectedOption);
        break;
      }
      case REMOVE_OPTION: {
        // remove options from autocomplete
        removeData(options);
        break;
      }
      case CLEAR: {
        // clear all options from autocomplete
        clearAllData();
        break;
      }
      default:
        break;
    }
  };

  const removeData = (options = []) => {
    if (options.length > 0) {
      let newStockList = findDeleteUtilsStock(options, stockDataList);
      setStockDataList(newStockList);
    } else {
      clearAllData();
    }
  };

  const clearAllData = () => {
    setSymbolList([]);
    setOpen(false);
    setStockDataList([]);
  };

  const selectOptionHandler = (selectedOption = "") => {
    if (selectedOption) {
      setOpen(false);
      getStockDetailsFromAPI(selectedOption);
    }
  };

  const getStockDetailsFromAPI = (symbol = "") => {
    getSymbolStockDetails(
      symbol,
      (details) => {
        if (!isEmpty(details)) {
          setOpen(false);
          if (details["Note"]) {
            // when API limit over
            let tempObj = { Symbol: symbol.toUpperCase(), Note: details.Note };
            setStockDataList((prevList) => [...prevList, ...[tempObj]]);
          } else setStockDataList((prevList) => [...prevList, ...[details]]);
        } else {
          let tempObj = { Symbol: symbol.toUpperCase() };
          setOpen(false);
          setStockDataList((prevList) => [...prevList, ...[tempObj]]);
        }
      },
      (err) => {}
    );
  };

  const createOptionHandler = (selectedOption = "") => {
    clearTimeout(timer);
    setOpen(false);
    getSymbolDataFromAPI(selectedOption, true);
  };

  const getSymbolDataFromAPI = (keyword = "", isEnter = false) => {
    getAllSymbols(
      keyword.toUpperCase(),
      (dataList) => {
        if (!isEnter) {
          setSymbolList(dataList);
          if (dataList.length === 0 && keyword.length > 0) {
            setIsNoOptions(true);
            let t = setTimeout(() => {
              setIsNoOptions(false);
              clearTimeout(t);
            }, 1500);
          }
        } else {
          if (dataList.length > 0)
            getStockDetailsFromAPI(keyword.toUpperCase());
          else {
            let tempObj = { Symbol: keyword.toUpperCase(), isNoRecord: true };
            setStockDataList((prevList) => [...prevList, ...[tempObj]]);
          }
        }
      },
      (err) => {
        setErr(err);
      }
    );
  };

  const delayedHandleChange = debounce((eventData) => {
    setOpen(true);
    getSymbolDataFromAPI(eventData);
  }, 300);

  const handleText = (value) => {
    setSearchTerm(value);
    setSymbolList([]);
    clearTimeout(timer);
    timer = setTimeout(() => {
      delayedHandleChange(value);
    }, 300);
  };

  const onSearchButtonClick = () => {
    createOptionHandler(searchTerm);
  };
  return (
    <Root className={classes.stockPickerWidgetContainer}>
      <SearchBar
        handleOnChangeAutoComplete={handleOnChangeAutoComplete}
        handleText={handleText}
        symbolList={symbolList}
        open={open}
        onSearchButtonClick={onSearchButtonClick}
        isNoOptions={isNoOptions}
      />
      <StockDetails stockDataList={stockDataList} />
    </Root>
  );
}

export default withStyles(styles)(StockPickerWidget);
