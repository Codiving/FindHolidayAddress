import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import convert from "xml-js";

const HOLIDAY_API_KEY = ""; // 공휴일 찾기 API 키

const getRequestUrl = (year, month) =>
  `/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?ServiceKey=${HOLIDAY_API_KEY}&solYear=${year}&solMonth=${month}`;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  search: {
    display: "flex",
  },
  date: {
    marginRight: 10,
  },
  table__container: {
    marginTop: 30,
    width: "70%",
  },
}));

const make2ZeroString = (number) => {
  let numberStr = "0" + number;
  numberStr = numberStr.slice(-2);

  return numberStr;
};

const FindHoliday = () => {
  const classes = useStyles();

  const [year, setYear] = useState("2021");
  const [month, setMonth] = useState("01");
  const [holidays, setHoldiays] = useState([]);

  const search = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    fetch(getRequestUrl(year, make2ZeroString(month)), requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let xml = convert.xml2json(result, { compact: false, spaces: 4 });
        xml = JSON.parse(xml);

        const dates = xml.elements[0].elements[1].elements[0].elements;
        const dateArr = [];

        for (let i = 0; i < dates.length; i++) {
          const { elements: dateObj } = dates[i];
          const obj = {
            name: dateObj[1].elements[0].text,
            holiday: dateObj[2].elements[0].text,
            date: dateObj[3].elements[0].text,
          };

          dateArr.push(obj);
        }

        setHoldiays(dateArr);
      })
      .catch((error) => {
        console.log("error", error);
        setHoldiays([]);
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.date}>
          <TextField
            label="년"
            variant="outlined"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <TextField
            label="월"
            variant="outlined"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
        <Button variant="contained" onClick={search}>
          검색
        </Button>
      </div>
      <TableContainer component={Paper} className={classes.table__container}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>날짜</TableCell>
              <TableCell>공휴일 유무</TableCell>
              <TableCell>공휴일 명</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holidays.map((row) => (
              <TableRow key={row.date}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.holiday}</TableCell>
                <TableCell>{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FindHoliday;