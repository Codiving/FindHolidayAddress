import React from "react";
import { FindAddress, FindHoliday } from "components";
import {
  Box,
  Typography,
  AppBar,
  makeStyles,
  Tabs,
  Tab,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const App = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="공휴일찾기" />
          <Tab label="주소찾기" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <FindHoliday />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FindAddress />
        </TabPanel>
      </AppBar>
    </div>
  );
};

export default App;