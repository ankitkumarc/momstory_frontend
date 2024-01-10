import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { AppBar, Box, IconButton, Toolbar, Typography, SwipeableDrawer } from "@mui/material";
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import { RiAccountCircleFill } from 'react-icons/ri';
import storyPandaLogo from '../../images/storypandalogo.jpeg';
import "../../Styles/HeaderStyles.css";

const Header = () => {
    let location = useLocation();
    useEffect(() => {
    }, [location]);

    const [mobileview, setMobileview] = React.useState(window.innerWidth <= 600);;
    const [dropdown] = useState()
    const handleDrawerToggle = () => {
        setMobileview(!mobileview);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }} role="presentation" className="mx-4">
            <div className='flex flex-col justify-between items-center'>
                <Link to={'/'}>
                    <img src={storyPandaLogo} alt="logo" className='h-[50px] w-[50px]' />
                </Link>
                <div className='font-bold text-xl' style={{ color: "#00b8a9" }}>StoryPanda</div>
            </div>
            <Divider />
            <List className="flex flex-col justify-center items-start mt-4  text-xl font-semibold">
                <ListItem className="listt">
                    <Link to={'/'}>
                        Home
                    </Link>
                </ListItem>
                <ListItem className="listt">
                    <Link to={'/createyourstory'}>
                        Create Your Story
                    </Link>
                </ListItem>
                <ListItem className="listt">
                    <Link to={'/famousfolktales'}>
                        Famous Folktales
                    </Link>
                </ListItem>
                <ListItem className="listt">
                    <Link to={'/contactus'}>
                        Contact Us
                    </Link>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment>
                <Box>
                    <AppBar component={"nav"} sx={{ bgcolor: "#fff" }}>
                        <Toolbar>
                            <IconButton color="white" aria-label='open drawer' edge='start' sx={{ mr: 2, display: { sm: "none" } }} onClick={handleDrawerToggle}>
                                <MenuSharpIcon />
                            </IconButton>
                            <Link to={'/'}>
                                <img src={storyPandaLogo} alt="logo" className='h-[3rem] w-[3rem] mr-2 sm:mr-0' />
                            </Link>
                            <Typography color={"#00b8a9"} component="div" sx={{ flexGrow: 1, fontFamily: "Exo", fontSize: "18px", fontWeight: "bold" }}>
                                StoryPanda
                            </Typography>
                            <Box sx={{ display: { xs: "none", sm: "flex", }, alignItems: "center", m: "2px" }}>
                                <ul className='navigation-menu'>
                                    <li>
                                        <Link to={'/'}>
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/createyourstory'}>
                                            Create Your Story
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/famousfolktales'}>
                                            Famous Folktales
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/contactus'}>
                                            Contact Us
                                        </Link>
                                    </li>
                                </ul>
                            </Box>
                            <div className="my-account" st>
                                {dropdown && <div className="dropdown">

                                    <Link to={'/savestories'} >Saved Stories</Link>

                                </div>}
                                {localStorage.getItem('token') &&
                                    <Link to={'/savestories'} ><RiAccountCircleFill className="account" style={{
                                        height: "2rem", width: "2rem", color: "#f6416c"
                                    }} /></Link>
                                }
                                {!localStorage.getItem('token') && <Link to={'/login'}> <button className=" min-w-[80px] w-[10rem] object-contain bg-red rounded-2 items-start m-3 py-[0.55rem] text-16 font-semibold text-white" style={{ backgroundColor: "#f6416c", color: "white" }}>
                                    Login
                                </button></Link>
                                }
                            </div >
                        </Toolbar>
                    </AppBar>
                    <SwipeableDrawer open={mobileview} onClose={() => setMobileview(false)} onOpen={() => setMobileview(true)}>
                        {drawer}
                    </SwipeableDrawer>
                </Box>
            </React.Fragment>
        </div>
    );
};

export default Header;
