import React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import { withStyles } from "@mui/styles";

const styles = (theme) => ({
  searchBar: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  paperNoOpt: {
    padding: "10px",
  },
  paperNoOptDiv: {
    padding: "10px",
    visibility: "hidden",
  },
});

function SearchBar(props) {
  const {
    classes = {},
    handleOnChangeAutoComplete = () => {},
    handleText = () => {},
    symbolList = [],
    open = false,
    isNoOptions = false,
    onSearchButtonClick = () => {},
  } = props;

  return (
    <div className={classes.searchBar}>
      <Autocomplete
        multiple
        open={open}
        freeSolo
        id="tags-outlined"
        onChange={(event, newValue, reason) => {
          handleOnChangeAutoComplete(newValue, reason);
        }}
        options={symbolList.map((option) => option["1. symbol"].toUpperCase())}
        defaultValue={[]}
        filterSelectedOptions
        clearOnBlur
        noOptionsText={"No Option Available."}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Search Symbol"
            placeholder="Enter Symbol"
            onChange={(event) => {
              handleText(event.target.value);
            }}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="filled" label={option} {...getTagProps({ index })} />
          ))
        }
        style={{ width: "100%" }}
      />
      {isNoOptions ? (
        <Paper className={classes.paperNoOpt} elevation={3}>
          No Symbol Available..
        </Paper>
      ) : (
        <div className={classes.paperNoOptDiv}>NA..</div>
      )}
      {/* <Button
        variant="contained"
        onClick={onSearchButtonClick}
        endIcon={<SearchIcon />}
        style={{ marginLeft: "16px" }}
      >
        Search
      </Button> */}
    </div>
  );
}
export default withStyles(styles)(SearchBar);
