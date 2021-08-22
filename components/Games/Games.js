import React, { useState } from "react";

import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Quote from "components/Typography/Quote.js";
import Button from "components/CustomButtons/Button.js";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
// @material-ui/icons
import GetAppIcon from "@material-ui/icons/GetApp";
import DescriptionIcon from "@material-ui/icons/Description";
import StarHalfIcon from "@material-ui/icons/StarHalf";

import StarRatings from '../../node_modules/react-star-ratings';
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/profilePage.js";
import { Link } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function games({ item }) {        
    const classes = useStyles();

    var cores = [
        "warning",
        "success",
        "danger",
        "info",
        "primary"
    ];

    function changeRating(e, name) {
        localStorage.setItem(name, e)
        setRating(!rating)
    }

    function setMe(e, name) {
        localStorage.setItem(`me${name}`, e.target.value)
        console.log(localStorage.getItem(`me${name}`))
        setRating(!rating)
    }
    
    const [rating, setRating] = useState(true)
    
    return (
            <GridItem key={item.id} xs={12} sm={6} md={4} lg={3} style={{ marginTop: "1rem" }}>
                <CustomTabs
                    headerColor={`${cores[Math.floor(Math.random() * cores.length)]}`}
                    tabs={[
                        {
                            tabName: "",
                            tabIcon: DescriptionIcon,
                            tabContent: (
                                <div>
                                    <h4 style={{ textAlign: "center" }} >{item.title}</h4>
                                    <img src={item.thumbnail} style={{ width: "100%" }} ></img>
                                    <div className={classes.typo}><br />
                                        <div className={classes.note}><b>Description</b></div>
                                        <Quote
                                            text={item.short_description}
                                        />
                                    </div>
                                    <div className={classes.typo}>
                                        <div className={classes.note}><b>Genre</b></div>
                                        <p>{item.genre}
                                        </p>
                                    </div>
                                    <div className={classes.typo}>
                                        <div className={classes.note}><b>Platform</b></div>
                                        <p>{item.platform}
                                        </p>
                                    </div>
                                    <div className={classes.typo}>
                                        <div className={classes.note}><b>Developer</b></div>
                                        <p>{item.developer}
                                        </p>
                                    </div>
                                    <div className={classes.typo}>
                                        <div className={classes.note}><b>Publisher</b></div>
                                        <p>{item.publisher}
                                        </p>
                                    </div>
                                    <div className={classes.typo}>
                                        <div className={classes.note}><b>Release Date</b></div>
                                        <p>{item.release_date.split("-")[2]}/{item.release_date.split("-")[1]}/{item.release_date.split("-")[0]}
                                        </p>
                                    </div>
                                </div>
                            ),
                        },
                        {
                            tabName: "",
                            tabIcon: StarHalfIcon,
                            tabContent: (
                                <>
                                <div style={{textAlign: "center"}}>Rating<br />
                                    <StarRatings
                                        rating={localStorage.getItem(item.title) | 0}
                                        starRatedColor="blue"
                                        changeRating={(e) => changeRating(e, item.title)}
                                        numberOfStars={5}
                                        starDimension="30px"
                                        starSpacing="6px"
                                        name='rating'
                                    />
                                </div><br />
                                    <InputLabel id="label">Me</InputLabel>
                                    <Select
                                        labelId="demo-customized-select-label"
                                        id="demo-customized-select"
                                        onChange={e => setMe(e, item.title)}
                                        value={localStorage.getItem(`me${item.title}`) ? localStorage.getItem(`me${item.title}`) : ""}
                                        style={{ width: "100%" }}
                                    >
                                        <MenuItem value={""}>---------------------------------------------------------------------------</MenuItem>
                                        <MenuItem value={"Playing"}>{"Playing"}</MenuItem>
                                        <MenuItem value={"Played"}>{"Played"}</MenuItem>
                                        <MenuItem value={"Wanna Play"}>{"Wanna Play"}</MenuItem>
                                    </Select>
                                </>
                            )
                        },
                        {
                            tabName: "",
                            tabIcon: GetAppIcon,
                            tabContent: (
                                <div >
                                    <Link href={item.game_url}>
                                        <Button className={classes.navLink} color="primary">Download<GetAppIcon className={classes.icons} /></Button>
                                    </Link>
                                </div>
                            )
                        },
                    ]}
                />
            </GridItem>
    );
}
