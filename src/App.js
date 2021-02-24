import { AppBar, Box, makeStyles, Tab, Tabs } from "@material-ui/core";
import { FindAddress, FindHoliday } from "components";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: "100%",
  },
  container: {
    height: "100%",
    background: "white",
  },
}));

const appBarStyle = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={classes.container}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const App = () => {
  const classes = useStyles();
  const appStyles = appBarStyle();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" classes={appStyles}>
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