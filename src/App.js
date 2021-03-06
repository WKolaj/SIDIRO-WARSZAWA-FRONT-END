import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ViewArrayIcon from "@material-ui/icons/ViewArray";
import EventIcon from "@material-ui/icons/Event";
import LanguageIcon from "@material-ui/icons/Language";
import BarChart from "@material-ui/icons/BarChart";
import { withStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { withTranslation } from "react-i18next";
import Overview from "./components/Overview";
import Elevation from "./components/Elevation";
import Reports from "./components/Reports/ReportsComponent";
import Events from "./components/Events";
import SlideupDialog from "./components/SlideupDialog";
import { connect } from "react-redux";
import { manageLanguageDialog } from "./actions/languageDialog";
import { manageDrawerOpen } from "./actions/index";
import LanguageDialog from "./components/LanguageSelectionDialog";
import Powermonitor from "./components/Powermonitor/PowermonitorComponent";
import MultilineChart from "@material-ui/icons/MultilineChart";
import BusyDialog from "./components/BusyDialog";
import SnackbarNotifier from "./components/SnackbarNotifier";
import { withSnackbar } from "notistack";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { getUserDataActionCreator } from "./actions/userData";
import { exists } from "./utils/utilities";
import MomentUtils from "@date-io/moment";
import "moment/locale/pl";
import "moment/locale/en-gb";
import Typography from "@material-ui/core/Typography";

const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: "block"
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    top: "44px"
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    top: "44px",
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 4px"
  },
  content: {
    flexGrow: 1,
    marginLeft: theme.spacing(7) + 1,
    padding: theme.spacing(3)
  }
});

class App extends React.Component {
  handleDrawerOpen = open => {
    this.props.manageDrawerOpen(open);
  };

  //Setting default lang to pl - bug fix with default lang of MuiPickersUtilsProvider
  componentDidMount = () => {
    //this.props.i18n.changeLanguage("pl");
    this.props.getUserData();
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.checkStates.syncError === false &&
      this.props.checkStates.syncError === true
    ) {
      this.props.enqueueSnackbar(this.props.t("snackbarsConnectionError"), {
        variant: "error"
      });
    }
  }

  renderMainComponent = () => {
    const { classes, t } = this.props;
    let open = this.props.drawerOpen;

    return (
      <div className={classes.root}>
        <SnackbarNotifier />
        <Router>
          <CssBaseline />
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open
              })
            }}
            open={open}
          >
            <div className={classes.toolbar}>
              <IconButton
                onClick={
                  open === false
                    ? () => this.handleDrawerOpen(true)
                    : () => this.handleDrawerOpen(false)
                }
              >
                {open ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>
            </div>
            <Divider />
            <List
              onClick={open ? () => this.handleDrawerOpen(false) : null}
              onBlur={open ? () => this.handleDrawerOpen(false) : null}
            >
              <ListItem button component={Link} to="/">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={t("overview")} />
              </ListItem>
              <ListItem button component={Link} to="/elewacja">
                <ListItemIcon>
                  <ViewArrayIcon />
                </ListItemIcon>
                <ListItemText primary={t("elevation")} />
              </ListItem>
              <ListItem button component={Link} to="/zdarzenia">
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText primary={t("events")} />
              </ListItem>
              <ListItem button component={Link} to="/powermonitor">
                <ListItemIcon>
                  <MultilineChart />
                </ListItemIcon>
                <ListItemText primary={t("powermonitor")} />
              </ListItem>
              <ListItem button component={Link} to="/reports">
                <ListItemIcon>
                  <BarChart />
                </ListItemIcon>
                <ListItemText primary={t("reports")} />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => this.props.manageLanguageDialog(true)}
              >
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary={t("language")} />
              </ListItem>
            </List>
          </Drawer>
          <BusyDialog />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route path="/elewacja" component={Elevation} />
              <Route path="/zdarzenia" component={Events} />
              <Route path="/powermonitor" component={Powermonitor} />
              <Route path="/reports" component={Reports} />
              <Route path="/" component={Overview} />
            </Switch>
          </main>
          <SlideupDialog />
          <LanguageDialog />
        </Router>
      </div>
    );
  };

  renderForbiddenAccessComponent = () => {
    const { t } = this.props;
    return (
      <Typography variant="h3" style={{ padding: 25 }}>
        {t("forbiddenAccessError")}
      </Typography>
    );
  };

  render() {
    const { user } = this.props;

    if (!exists(user.isUser)) return null;

    return (
      <MuiPickersUtilsProvider
        utils={MomentUtils}
        locale={this.props.i18n.language === "pl" ? "pl" : "en-gb"}
      >
        {user.isUser
          ? this.renderMainComponent()
          : this.renderForbiddenAccessComponent()}
      </MuiPickersUtilsProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    drawerOpen: state.drawerReducer.drawerOpen,
    languageDialogOpen: state.languageDialogReducer.openDialog,
    applicationLanguage: state.languageDialogReducer.language,
    checkStates: state.switchesStateReducer,
    user: state.user
  };
}

const mapDispatchToProps = {
  manageLanguageDialog,
  manageDrawerOpen,
  getUserData: getUserDataActionCreator
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(withSnackbar(App))));
