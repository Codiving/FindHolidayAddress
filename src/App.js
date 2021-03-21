import { AppBar, Box, makeStyles, Tab, Tabs } from "@material-ui/core";
import { FindAddress, FindHoliday } from "components";
import React, { useCallback, useState } from "react";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: "100%"
  },
  container: {
    height: "100%",
    background: "white"
  },
  tab__item: {
    height: "calc(100% - 48px)",
    overflow: "hidden"
  }
}));

const appBarStyle = makeStyles(() => ({
  root: {
    height: "100%"
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      className={classes.container}
      {...other}
    >
      {value === index && (
        <Box p={3} className={classes.tab__item}>
          {children}
        </Box>
      )}
    </div>
  );
}

const App = () => {
  const classes = useStyles();
  const appStyles = appBarStyle();
  const [value, setValue] = useState(0);

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" classes={appStyles}>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: "yellow",
              border: 2
            }
          }}
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