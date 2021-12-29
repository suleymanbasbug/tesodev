import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyle = makeStyles((theme) => ({
  button: {
    width: "5em",
    height: "2em",
    borderRadius: "8px",
    backgroundColor: "#204080",
    color: "#ffffff",
    marginLeft: "1em",
  },
}));

export default function Button({ theme }) {
  const classes = useStyle();
  return (
    <div>
      <button className={theme ? theme : classes.button}>Search</button>
    </div>
  );
}
