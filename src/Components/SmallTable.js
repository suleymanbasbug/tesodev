import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  box: {
    width: "40em",
    bgcolor: "background.paper",
    border: "1px solid #484848",
    borderRadius: "4px",
    boxSizing: "border-box",
    margin: "2em 2em",
  },
  chip: {
    margin: theme.spacing(0.8),
    display: "flex",
  },
}));

const formatDate = (date) => {
  return date.split("/").at(-1);
};

export default function SmallTable({ filteredData, search }) {
  const classes = useStyles();
  let navigate = useNavigate();
  const showMore = () => {
    navigate(`/search/${search}`);
  };
  return (
    <>
      {filteredData?.length === 0 ? null : (
        <Box className={classes.box}>
          <List>
            {filteredData?.map((item, index) => {
              if (index > 2) {
                return null;
              }
              return (
                <>
                  <ListItem>
                    <ListItemText
                      primary={`${item[4]} - ${item[5]}`}
                      secondary={`${item[0]} - ${formatDate(item[3])}`}
                    />
                    <ListItemText
                      secondary={`Email : ${item[2]}`}
                      style={{ textAlign: "right" }}
                    />
                  </ListItem>
                  <Divider />
                </>
              );
            })}

            {filteredData.length > 2 ? (
              <Chip
                label="Show More..."
                variant="outlined"
                className={classes.chip}
                onClick={showMore}
              />
            ) : null}
          </List>
        </Box>
      )}
    </>
  );
}
