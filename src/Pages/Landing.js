import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import image from "../image.jpg";
import SmallTable from "../Components/SmallTable";
import { Container } from "@material-ui/core";
import axios from "../services/axios";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    marginTop: theme.spacing(15),
  },
  image: {
    maxHeight: "15em",
    maxWidth: "13em",
    marginBottom: theme.spacing(5),
  },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
  },
}));

export default function Landing() {
  const classes = useStyles();
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      const filteredData = data.filter((item) =>
        item[0].toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filteredData);
    }
    if (search.length === 0) {
      setFilteredData([]);
    }
  }, [search]);

  return (
    <Container>
      <Box className={classes.root}>
        <img src={image} alt="" className={classes.image} />
        <Box className={classes.inputGroup}>
          <Input setSearch={setSearch} search={search} />
          <Button />
        </Box>
        <SmallTable
          filteredData={filteredData}
          type={"landing"}
          search={search}
        />
      </Box>
    </Container>
  );
}
