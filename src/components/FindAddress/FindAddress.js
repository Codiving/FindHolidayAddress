import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import request from "request";

const API_KEY = "";
const countPerPage = 100;

const getUrl = (curPage) =>
  `https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${API_KEY}&currentPage=${curPage}&countPerPage=${countPerPage}&keyword=강남&resultType=json`;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  search__container: {
    display: "flex",
  },
  text: {
    marginRight: 10,
  },
  table__container: {
    marginTop: 30,
    width: "70%",
  },
  zipno: {
    width: 50,
  },
}));

const FindAddress = () => {
  const classes = useStyles();

  const [keyword, setKeyword] = useState("");
  const [addrs, setAddrs] = useState([]);

  const search = () => {
    const options = {
      method: "GET",
      url: getUrl(1),
      headers: {
        Cookie: "elevisor_for_j2ee_uid=3pb5dyr4kp1nj",
      },
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      setAddrs(JSON.parse(response.body).results.juso);
    });
  };

  return (
    <div>
      <div className={classes.search__container}>
        <TextField
          className={classes.text}
          label="검색어"
          variant="outlined"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button variant="contained" onClick={search}>
          검색
        </Button>
      </div>
      <TableContainer component={Paper} className={classes.table__container}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow className={classes.row}>
              <TableCell className={classes.zipno}>우편번호</TableCell>
              <TableCell>지번 주소</TableCell>
              <TableCell>도로명 주소</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addrs.map((row) => (
              <TableRow key={row.roadAddr}>
                <TableCell>{row.zipNo}</TableCell>
                <TableCell>{row.jibunAddr}</TableCell>
                <TableCell>{row.roadAddr}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FindAddress;