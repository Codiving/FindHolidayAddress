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
import React, { useCallback, useState } from "react";
import convert from "xml-js";

const HOLIDAY_API_KEY = process.env.REACT_APP_HOLIDAY_KEY;

const getRequestUrl = (year, month) =>
  `/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?ServiceKey=${HOLIDAY_API_KEY}&solYear=${year}&solMonth=${month}`;

const useStyles = makeStyles(() => ({
  root: {
    height: "100%"
  },
  search: {
    display: "flex"
  },
  date: {
    marginRight: 10,
    "& > div": {
      width: 100
    }
  },
  table__container: {
    marginTop: 30,
    width: "70%",
    "& th:nth-child(1)": { width: "25%" },
    "& th:nth-child(2)": { width: "50%" },
    "& th:nth-child(3)": { width: "25%" },
    "& th": {
      textAlign: "center"
    },
    "& td": {
      textAlign: "center"
    }
  }
}));

const make2ZeroString = number => "0".concat(number).slice(-2);

const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
};

const makeHolidayArrs = result => {
  const xml = JSON.parse(
    convert.xml2json(result, { compact: false, spaces: 4 })
  );

  const dates = xml.elements[0].elements[1].elements[0].elements;
  const dateArr = [];

  dates.forEach(el => {
    const { elements: date } = el;
    dateArr.push({
      name: date[1].elements[0].text,
      holiday: date[2].elements[0].text,
      date: date[3].elements[0].text
    });
  });

  return dateArr;
};

const FindHoliday = () => {
  const classes = useStyles();

  const [year, setYear] = useState("2021");
  const [month, setMonth] = useState("03");
  const [holidays, setHoldiays] = useState([]);

  const search = useCallback(() => {
    fetch(getRequestUrl(year, make2ZeroString(month)), requestOptions)
      .then(response => response.text())
      .then(result => setHoldiays(makeHolidayArrs(result)))
      .catch(error => {
        console.log("error", error);
        setHoldiays([]);
      });
  }, [month, year]);

  const handleYear = useCallback(e => setYear(e.target.value), []);

  const handleMonth = useCallback(e => setMonth(e.target.value), []);

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.date}>
          <TextField
            label="년"
            variant="outlined"
            margin="dense"
            value={year}
            onChange={handleYear}
          />
          <TextField
            label="월"
            variant="outlined"
            margin="dense"
            value={month}
            onChange={handleMonth}
          />
        </div>
        <Button variant="contained" onClick={search}>
          검색
        </Button>
      </div>
      <TableContainer component={Paper} className={classes.table__container}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>날짜</TableCell>
              <TableCell>공휴일 명</TableCell>
              <TableCell>공휴일 유무 (Y / N)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holidays.map(row => {
              const { date, name, holiday } = row;
              const y = date.substring(0, 4);
              const m = date.substring(4, 6);
              const d = date.substring(6, 8);
              return (
                <TableRow key={date}>
                  <TableCell>{`${y}년 ${m}월 ${d}일`}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{holiday}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FindHoliday;