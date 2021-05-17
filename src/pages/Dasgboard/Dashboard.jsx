import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import logo from '../../assets/images/logo2.png';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddMomemt from '../../components/AddMoment/AddMoment';
import { Route } from 'react-router-dom';
import './Dashboard.scss';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    menu: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: '#FFFFFF'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        background: '#FFFFFF',
        // boxShadow: '0px 4px 9px rgba(201, 201, 201, 0.09)'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: '#001B30'
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        border: 'none'
    },
    drawerPaper: {
        width: drawerWidth,
        border: 'none',
        boxShadow: '4px 0px 9px rgba(201, 201, 201, 0.09)'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(5, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'center',
        border: 'none'
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(1),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        border: 'none'
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    textFont: {
        '& .MuiTypography-body1': {
            fontFamily: 'Maven Pro',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '21px'
        }
    },
    menuItem: {
        '& .MuiTypography-body1': {
            fontFamily: 'Maven Pro',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '19px'
        }
    },
    selectedItem: {
        '& .MuiTypography-body1': {
            fontWeight: '550',
        }
    }
}));

export default function Dashboard(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [menu, setMenu] = React.useState(true);
    const [item, setItem] = React.useState("item2");
    let { firstName, lastName } = JSON.parse(localStorage.getItem('userdata'));

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const handleClick = () => {
        setMenu(!menu);
    };

    const handleMenuItem = (e, value, path) => {
        e.stopPropagation();
        setItem(value);
        props.history.push(path);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Avatar alt={firstName} src="" >
                        {firstName.charAt(0) + '' + lastName.charAt(0).toUpperCase()}
                    </Avatar>

                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <img src={logo} alt="" className="logo" />
                </div>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.menu}
                >
                    <ListItem button className="menu-button text-font">
                        <ListItemText primary="Profile" className={classes.textFont} />
                    </ListItem>
                    <ListItem button onClick={handleClick} className="menu-list menu-button">
                        <ListItemText primary="Moments" className={classes.textFont} />
                        {menu ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={menu} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding >
                            <ListItem button className="text-font menu-button" onClick={e => handleMenuItem(e, "item1", "/dashboard/moments")}>
                                <div className={clsx('text-bullet', item === "item1" && 'hide-item')}></div>
                                <ListItemText primary="Moment List" className={clsx(classes.menuItem, item === "item1" && classes.selectedItem)} />
                            </ListItem>
                            <ListItem button className="text-font menu-button" onClick={e => handleMenuItem(e, "item2", "/dashboard/addMoment")}>
                                <div className={clsx('text-bullet', item === "item2" && 'hide-item')}></div>
                                <ListItemText primary="Add new moment" className={clsx(classes.menuItem, item === "item2" && classes.selectedItem)} />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <Route exact path="/dashboard/addMoment" >
                    <AddMomemt type="add" title="Add new moment" />
                </Route>
                <Route exact path="/dashboard/moments" >
                    <AddMomemt type="list" title="Moments" />
                </Route>
            </main>
        </div>
    );
}
