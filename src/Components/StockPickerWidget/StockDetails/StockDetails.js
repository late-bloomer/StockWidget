import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import { withStyles } from "@mui/styles";
const styles = (theme) => ({
  paper: {
    minHeight: "65vh",
    marginTop: "8px",
    padding: "16px",
    position: "relative",
  },
  stockDetailsHeader: {
    margin: "auto",
    color: "blue",
    fontSize: "24px",
    fontWeight: 600,
    textAlign: "center",
  },
  detailsElement: {
    display: "flex",
    margin: "24px 0",
  },
  detailsElementName: {
    fontWeight: 900,
  },
  arrowForward: {
    position: "absolute",
    right: 0,
    transform: "translateY(-25%)",
  },
  arrowBack: {
    position: "absolute",
    left: 0,
    transform: "translateY(-25%)",
  },
  noRecords: {
    margin: "24px 0",
    fontSize: "32px",
    fontWeight: 600,
  },
  resultSearch: {
    right: 4,
  },
  detailsElementNoRecords: {
    color: "red",
    fontWeight: 900,
    margin: "24px 0",
  },
});

function StockDetails({ classes = {}, stockDataList = [] }) {
  const [currDataIndex, setCurrDataIndex] = useState(0);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setDataList(stockDataList);
    setCurrDataIndex(0);
  }, [stockDataList.length]);

  const handleBackArrow = () => {
    setCurrDataIndex((prev) => prev - 1);
  };

  const handleForwardArrow = () => {
    setCurrDataIndex((prev) => prev + 1);
  };

  return (
    <div>
      <div className={classes.resultSearch}>
        {dataList.length > 0
          ? `${currDataIndex + 1} out of ${dataList.length} result(s)`
          : "0 result(s)"}
      </div>

      <Paper className={classes.paper} elevation={3}>
        <div className={classes.arrowBack}>
          <IconButton
            aria-label="delete"
            size="large"
            disabled={currDataIndex === 0}
            onClick={handleBackArrow}
          >
            <ArrowBackIcon fontSize="inherit" />
          </IconButton>
        </div>
        <div className={classes.arrowForward}>
          <IconButton
            aria-label="delete"
            size="large"
            disabled={dataList.length - 1 === currDataIndex}
            onClick={handleForwardArrow}
          >
            <ArrowForwardIcon fontSize="inherit" />
          </IconButton>
        </div>
        <div className={classes.stockDetailsHeader}> STOCK DETAILS </div>
        {dataList.length == 0 ? (
          <div className={classes.noRecords}>No records !!!</div>
        ) : (
          <div style={{ marginTop: "24px" }}>
            <div className={classes.detailsElement}>
              <div className={classes.detailsElementName}>Symbol: </div>
              <div>{dataList[currDataIndex].Symbol || "NA"} </div>
            </div>
            {dataList[currDataIndex].isNoRecord ? (
              <div className={classes.detailsElementNoRecords}>
                No records !!!
              </div>
            ) : dataList[currDataIndex].Note ? (
              <div className={classes.detailsElementNoRecords}>
                {dataList[currDataIndex].Note}
              </div>
            ) : (
              <>
                <div className={classes.detailsElement}>
                  <div className={classes.detailsElementName}>Name: </div>
                  <div>{dataList[currDataIndex].Name || "NA"} </div>
                </div>
                <div className={classes.detailsElement}>
                  <span>
                    <span className={classes.detailsElementName}>
                      Description:{" "}
                    </span>
                    <span>{dataList[currDataIndex].Description || "NA"}</span>
                  </span>
                </div>
                <div className={classes.detailsElement}>
                  <div className={classes.detailsElementName}>
                    Current Price:{" "}
                  </div>
                  <div>
                    {dataList[currDataIndex].AnalystTargetPrice || "NA"}
                  </div>
                </div>
                <div className={classes.detailsElement}>
                  <div className={classes.detailsElementName}>
                    Change Its Traded On:{" "}
                  </div>
                  <div>
                    {dataList[currDataIndex].PriceToSalesRatioTTM || "NA"}
                  </div>
                </div>
                <div className={classes.detailsElement}>
                  <div className={classes.detailsElementName}>Industry: </div>
                  <div>{dataList[currDataIndex].Industry || "NA"}</div>
                </div>
                <div className={classes.detailsElement}>
                  <div className={classes.detailsElementName}>PE Ratio: </div>
                  <div>{dataList[currDataIndex].PERatio || "NA"}</div>
                </div>
                <div className={classes.detailsElement}>
                  <div className={classes.detailsElementName}>
                    Market Capitalization:{" "}
                  </div>
                  <div>
                    {dataList[currDataIndex].MarketCapitalization || "NA"}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </Paper>
    </div>
  );
}

export default withStyles(styles)(StockDetails);
