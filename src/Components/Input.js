import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyle = makeStyles((theme) => ({
  input: {
    width: "30em",
    height: "2em",
    border: "2px solid #000000",
    borderRadius: "8px",
    boxSizing: "border-box",
  },
}));
export default function Input({ theme, setSearch, search }) {
  const classes = useStyle();
  return (
    <div>
      <input
        value={search}
        className={theme ? theme : classes.input}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
    </div>
  );
}
