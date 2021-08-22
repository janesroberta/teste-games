import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import SearchIcon from "@material-ui/icons/Search";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import Games from "../components/Games/Games"
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/profilePage.js";
import Load from "../assets/img/load.gif"

import api from "../services/api";
import StarRatings from '../node_modules/react-star-ratings';

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const { ...rest } = props;

    var genre = [
        "mmorpg",
        "shooter",
        "strategy",
        "moba",
        "racing",
        "sports",
        "social",
        "card",
        "mmo",
        "fantasy",
        "sci-fi",
        "fighting",
        "action",
    ]

    var platforms = [
        "pc", "browser"
    ]

    const [loading, setLoading] = useState(true)
    const [dados, setDados] = useState([])
    const [allGames, setAllGames] = useState([])
    const [sPlatform, setSPlatform] = useState("")
    const [sGenre, setSGenre] = useState("")
    const [vSearch, setVSearch] = useState("")
    const [vRating, setVRating] = useState(0)
    let sSearch = ""

    useEffect(() => {
        async function getData() {
            await api.get("/games").then(function (response) {
                let array = response.data.sort((a, b) => (a.title > b.title) ? 1 : -1);
                setDados(array)
                setAllGames(array)
            }).catch(function (error) {
                console.error(error);
            }).finally(() => {
                setLoading(false)
            });
        }
        getData()
    }, [])

    useEffect(() => {
        filter()
    }, [sPlatform, sGenre, vSearch, vRating])

    async function search(e) {
        e.preventDefault()
        setVSearch(sSearch)
    }

    async function plataformFilter(e) {
        setSPlatform(e.target.value)
    }

    async function genreFilter(e) {
        setSGenre(e.target.value)
    }

    async function ratingFilter(e) {
        setVRating(e)
    }

    function filter(array_filtered) {
        let filtered_data = allGames
        let filtered_aux = []
        if (sPlatform) {
            filtered_aux = []
            filtered_data.map(item => {
                if (item.platform.toUpperCase().search(sPlatform.toUpperCase()) != -1) {
                    filtered_aux.push(item)
                }
            })
            filtered_data = filtered_aux
        }

        if (sGenre) {
            filtered_aux = []
            filtered_data.map(item => {
                if (item.genre.toUpperCase().search(sGenre.toUpperCase()) != -1) {
                    filtered_aux.push(item)
                }
            })
            filtered_data = filtered_aux
        }

        if (vSearch) {
            filtered_aux = []
            filtered_data.map(item => {
                if (item.title.toUpperCase().search(vSearch.toUpperCase()) != -1) {
                    filtered_aux.push(item)
                }
            })
            filtered_data = filtered_aux
        }

        if (vRating) {
            filtered_aux = []
            filtered_data.map(item => {
                if (localStorage.getItem(item.title) == vRating) {
                    filtered_aux.push(item)
                }
            })
            filtered_data = filtered_aux
        }
        setDados(filtered_data)
    }

    async function clearFilters() {
        setSPlatform("")
        setVSearch("")
        setSGenre("")
        document.getElementById("search").value = ""
        setVRating(0)
    }

    return (
        <div >
            <Header
                color="white"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 100,
                    color: "white"
                }}
                {...rest}
            />
            <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
            {!loading ?
                <div id="true" className={classNames(classes.main, classes.mainRaised)} >
                    <div style={{ marginLeft: "50px" }}>
                        <GridContainer >
                            <GridItem style={{ marginTop: "10px" }} xs={12} sm={6} md={4} lg={3} >
                                <form onSubmit={e => search(e)}>
                                    <CustomInput
                                        labelText="Search Title"
                                        inputProps={{
                                            id: "search",
                                            type: "text",
                                            onChange: e => sSearch = e.target.value
                                        }}
                                    />
                                    <Button type="submit" size="sm" required style={{ marginTop: "20px", marginLeft: "10px" }} variant="contained" color="primary">
                                        <SearchIcon className={classes.icons} />
                                    </Button>
                                </form>
                            </GridItem>
                            <GridItem style={{ marginTop: "20px" }} xs={12} sm={6} md={4} lg={3} >
                                <InputLabel id="label">Select Platform</InputLabel>
                                <Select
                                    labelId="demo-customized-select-label"
                                    id="demo-customized-select"
                                    onChange={e => plataformFilter(e)}
                                    value={sPlatform}
                                    style={{ width: "100%" }}
                                >
                                    <MenuItem value={""}>---------------------------------------------------------------------------</MenuItem>
                                    {platforms.map((e, x) => <MenuItem key={x} value={e}>{e}</MenuItem>)}
                                </Select>
                            </GridItem>
                            <GridItem style={{ marginTop: "20px" }} xs={12} sm={6} md={4} lg={3} >
                                <InputLabel id="label">Select Genre</InputLabel>
                                <Select
                                    labelId="demo-customized-select-label"
                                    id="demo-customized-select"
                                    onChange={e => genreFilter(e)}
                                    value={sGenre}
                                    style={{ width: "100%" }}
                                >
                                    <MenuItem value={""}>---------------------------------------------------------------------------</MenuItem>
                                    {genre.map((e, x) => <MenuItem key={x} value={e}>{e}</MenuItem>)}
                                </Select>
                            </GridItem>
                            <GridItem style={{ marginTop: "20px" }} xs={12} sm={6} md={4} lg={3} >
                                <div style={{ textAlign: "center" }}>Rating<br />
                                    <StarRatings
                                        id="rating1234321"
                                        rating={vRating}
                                        starRatedColor="blue"
                                        changeRating={(e) => ratingFilter(e)}
                                        numberOfStars={5}
                                        name='filterRating'
                                    />
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer justify="center">
                            <Button required style={{ marginTop: "20px", marginLeft: "10px" }} variant="contained" color="warning" onClick={() => clearFilters()}>
                                Clear Filters
                            </Button>
                        </GridContainer>
                    </div>
                    <div >
                        <GridContainer alignItems="flex-start" justify="flex-start" style={{ margin: "1rem 0" }} >
                            {dados.map(item => (
                                <Games key={item.id} item={item} />
                            ))}
                        </GridContainer>
                    </div>
                </div> 
                :
                <div className={classNames(classes.main, classes.mainRaised)} style={{width: "100wh", height: "auto", textAlign: "center", verticalAlign: "middle"}} >
                    <img src={Load} style={{maxWidth: "100%"}}></img>
                </div>
            }
            <Footer />
        </div>
    );
}
