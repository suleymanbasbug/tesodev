import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import image from "../image.jpg";
import Input from "../Components/Input";
import Button from "../Components/Button";
import SearchTable from "../Components/SearchTable";
import Pagination from "@mui/material/Pagination";
import axios from "../services/axiosInstance";
import { useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  nav: {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing(5),
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: "8em",
  },
  input: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: "30em",
    height: "2.6em",
    border: "2px solid #000000",
    borderRadius: "8px",
    boxSizing: "border-box",
  },
  button: {
    marginTop: theme.spacing(2),
    width: "5em",
    height: "2.6em",
    borderRadius: "8px",
    backgroundColor: "#4F75C2",
    color: "#ffffff",
    marginLeft: "1em",
  },
}));

export default function Search() {
  const classes = useStyles();
  const { pathname } = useLocation();
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [orderType, setOrderType] = useState();

  useEffect(() => {
    if (!localStorage.getItem("data")) {
      async function getData() {
        axios.get().then((res) => {
          localStorage.setItem("data", JSON.stringify(res.data.record.data));
          setData(res.data.record.data);
        });
      }
      getData();
    }
    console.log(pathname);
    setSearch(pathname.split("/")[2]);
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      const filteredData = data.filter((item) =>
        item[0].toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filteredData);
      setPageCount((filteredData.length / 3).toFixed(0));
    }
    if (search.length === 0) {
      setFilteredData([]);
      setPageCount(0);
    }
  }, [search]);

  useEffect(() => {
    if (orderType === "nameasc") {
      const newFilteredData = filteredData.sort((a, b) =>
        a[0] > b[0] ? 1 : -1
      );
      setFilteredData([...newFilteredData]);
    }
    if (orderType === "namedesc") {
      const newFilteredData = filteredData.sort((a, b) =>
        a[0] > b[0] ? -1 : 1
      );
      setFilteredData([...newFilteredData]);
    }
    if (orderType === "yearasc") {
      const newFilteredData = filteredData.sort((a, b) =>
        a[3].split("/")[2] > b[3].split("/")[2] ? 1 : -1
      );
      setFilteredData([...newFilteredData]);
    }
    if (orderType === "yeardesc") {
      const newFilteredData = filteredData.sort((a, b) =>
        a[3].split("/")[2] > b[3].split("/")[2] ? -1 : 1
      );
      setFilteredData([...newFilteredData]);
    }
  }, [orderType]);

  return (
    <Container>
      <Box className={classes.nav}>
        <img src={image} alt="" className={classes.image} />
        <Input theme={classes.input} setSearch={setSearch} search={search} />
        <Button theme={classes.button} />
      </Box>
      <Box className={classes.search}>
        <SearchTable
          type="search"
          search={search}
          filteredData={filteredData}
          page={page}
          setOrderType={setOrderType}
        />
        {pageCount > 0 ? (
          <Pagination
            count={`${pageCount}`}
            variant="outlined"
            shape="rounded"
            page={page}
            onChange={(e, page) => setPage(page)}
          />
        ) : null}
      </Box>
    </Container>
  );
}
