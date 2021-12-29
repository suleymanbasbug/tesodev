import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";
import SortButton from "../Components/SortButton";
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

export default function SearchTable({ filteredData, page, setOrderType }) {
  const classes = useStyles();
  const [firstData, setfirstData] = useState(0);
  const [lastData, setlastData] = useState(3);

  useEffect(() => {
    setfirstData((parseInt(page) - 1) * 3);
    setlastData(parseInt(page) * 3);
  }, [page]);

  return (
    <>
      {filteredData?.length === 0 ? null : (
        <Box className={classes.box}>
          <SortButton setOrderType={setOrderType} />

          <List>
            {filteredData?.map((item, index) => {
              if (index >= firstData && index <= lastData) {
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
              }
              return null;
            })}
          </List>
        </Box>
      )}
    </>
  );
}
