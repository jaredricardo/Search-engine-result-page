import React, { Component } from 'react'
import animation from '../data/animation.json'
import travel from '../data/travel.json'
import example from '../data/example.json'
import {sort, filter, formatData} from '../functions'
import Video from './Video'

import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap'
import { createBrowserHistory } from "history"

const QUERY_KEY = 'q'
const urlParams = new URLSearchParams(window.location.search)
const browserHistory = createBrowserHistory()

export class Serp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            currentSearchParam: "",
            dateFilter: "anyDate",
            durationFilter: "anyDuration",
            featuredFilter: "anyFeatured",
            currentSort: null,
            smallMenu: false,
            videos: {
                animation: {
                    total: animation.total,
                    data: animation.data.map(formatData)
                },
                example: {
                    total: example.total,
                    data: example.data.map(formatData)
                },
                travel: {
                    total: travel.total,
                    data: travel.data.map(formatData)
                }
            }
        }
    }

    componentDidMount() {
        this.checkURL()
    }

    componentDidUpdate() {
        const qs = window.location.search.replace('?q=','')
        if(qs !== this.state.currentSearchParam) {
            this.setState({
                currentSearchParam:qs
            })
        }
    }

    checkURL = async () => {
        if (!urlParams.has(QUERY_KEY)) return
        const currentURLParam = urlParams.get(QUERY_KEY).trim()
        if(currentURLParam !== this.state.currentSearchParam) {
            this.setState({
                currentSearchParam: currentURLParam,
            })
        }
    }

    onInputChange = (e) => {
        this.setState({ value: e.target.value })
    }

    onSubmit = async (e) => {
        e.preventDefault()
        const value = document.getElementById('input-field').value
        
        if (value.length === 0) {
            alert ('Redirected to https://vimeo.com/search?q=')
        } else {
            this.setState({
                currentSearchParam: value.trim(),
            })
        }
        browserHistory.push(`?${QUERY_KEY}=${value}`)
    }

    onSortChange = async (e) => {
        this.setState({currentSort: e.target.value})
    }


    onDateFilterChange = async (e) => {
        this.setState({
            dateFilter: e.target.value,
        })
    }

    onDurationFilterChange = async (e) => {
        this.setState({
            durationFilter: e.target.value,
        })
    }

    onFeaturedFilterChange = async (e) => {
        this.setState({
            featuredFilter: e.target.value,
        })
    }

    openSmallFilters = () => {
        this.setState({
            smallMenu: true
        })
    }

    closeSmallMenu = () => {
        this.setState({
            smallMenu: false
        })
    }

    render() {

        const Button = styled.button`
            background: transparent;
            border-radius: 3px;
            border: 2px solid #59b2ed;
            color: #59b2ed;
            margin: 0 1em;
            padding: 0.25em 1em;
        `
        const Button2 = styled.button`
            background: transparent;
            border-radius: 3px;
            border: 2px solid #59b2ed;
            color: #59b2ed;
            padding: 0.25em 1em;
        `

        const videos = this.state.videos.hasOwnProperty(this.state.currentSearchParam)
            ? this.state.videos[this.state.currentSearchParam]
            : {total: 0, data: []}

        const total = videos.total
        const filteredResults = sort(filter(
            videos.data,
            this.state.dateFilter,
            this.state.durationFilter,
            this.state.featuredFilter
        ), this.state.currentSort)

        const urlParams = new URLSearchParams(window.location.search)
        const cond = urlParams.has(QUERY_KEY)
        const resultInfo = filteredResults.length !== 0 && cond
            ? <h5> {total} results for "{this.state.currentSearchParam}" </h5>
            : <span></span>
            
        const output = filteredResults.length === 0 && cond
            ? <h5> we got nothin' for ya ;-( </h5>
            : filteredResults.map(Video)

        const smallMenu = this.state.smallMenu
        const smallFilterMenu = (smallMenu) ? "menu-change" : "menu-change hide"
        
        const filterMenu = 
                        <React.Fragment>
                            <div className="filter-options"> 
                                <h4>Filter by:</h4>
                                    <h6> Data Uploaded </h6>
                                        <ul>
                                            <form onChange={this.onDateFilterChange}>
                                                <li> <input type="radio"  className="filter-radio" name="date" value="anyDate" defaultChecked/> Any     </li>
                                                <li> <input type="radio" className="filter-radio" name="date" value="365" /> Last 365 Days               </li>
                                                <li> <input type="radio"  className="filter-radio" name="date" value="30"/> Last 30 Days                </li>
                                                <li> <input type="radio" className="filter-radio" name="date" value="7"/> Last 7 Days                   </li>
                                            </form>
                                        </ul>
                                    <h6> Duration </h6>
                                        <ul>
                                            <form onChange={this.onDurationFilterChange}>
                                                <li> <input type="radio" className="filter-radio" name="duration" value="anyDuration" defaultChecked/> Any  </li>
                                                <li> <input type="radio" className="filter-radio" name="duration" value="short"/> Short (&lt;4:00)          </li>
                                                <li> <input type="radio" className="filter-radio" name="duration" value="med"/> Med. (4 - 10:00)            </li>
                                                <li> <input type="radio" className="filter-radio" name="duration" value="long"/> Long (>10:00)              </li>
                                            </form>
                                        </ul>
                                    <h6> Staff Picks </h6>
                                        <ul>
                                            <form onChange={this.onFeaturedFilterChange}>
                                                <li> <input type="radio" className="filter-radio" name="featured" value="anyFeatured" defaultChecked/> Any  </li>
                                                <li> <input type="radio" className="filter-radio" name="featured" value="featured"/> Featured               </li>
                                            </form>
                                        </ul>
                                <Button2  className="collapse-button" onClick={this.closeSmallMenu}> X </Button2>
                            </div>
                        </React.Fragment>

        return (
            <Container fluid> 
                <Row className="header">
                    <Col md= {3} sm={0} xs={0}>
                        {/* filler col space  */}
                    </Col>

                    <Col xl={8} lg={9} md= {9} sm={12} xs={12}>

                        <div className="search-box">
                                <form onSubmit={this.onSubmit}> 
                                    <input  autoFocus
                                            id="input-field"
                                            placeholder="Search videos, people, and more"
                                            type="text"
                                            autoComplete="off"
                                            maxLength="18"/>
                                    <Button type="submit">Search</Button>
                                </form>
                        </div>

                        <div className="searched"> 
                            {resultInfo} 
                        </div>
                     
                       
                    </Col>

                    <Col xl={1} lg={0}>
                        {/* filler col space */}
                    </Col>
                </Row>
             
                <Row>
                    <Col xl ={3} lg={3} md= {3} sm={0} xs={0} className="small-no-padding"> 

                        <Container fluid className="sort-options">
                            <div> 
                                <Button2 className="filter-show" onClick={this.openSmallFilters}>
                                    Filters
                                </Button2 >
                            </div>
                            <div> 
                            <h4>Sort by:</h4>
                                <select defaultValue="" onChange={this.onSortChange} id="sort-menu">
                                    <option value=""> Choose...</option>
                                    <option value="Popularity">Popularity</option>
                                    <option value="TitleAZ">Title (A-Z)</option>
                                    <option value="TitleZA">Title (Z-A)</option>
                                    <option value="Longest">Longest</option>
                                    <option value="Shortest">Shortest</option>
                                    <option value="Newest">Date uploaded (newest)</option>
                                    <option value="Oldest">Date uploaded (oldest)</option>
                                    <option value="UserAZ">Username (A-Z)</option>
                                    <option value="UserZA">Username (Z-A)</option>
                                </select>
                            </div>
                        </Container>
    
                        <Container className={smallFilterMenu}>  
                            {filterMenu}
                        </Container>
                    </Col> 
                    
                    <Col xl={8} lg={9} md= {9} sm={12} xs={12}> 
                        <Row>
                            {output}
                        </Row>
                    </Col>

                    <Col xl={1} lg={0} md= {0} sm={0} xs={0}> 
                         {/* filler space col  */}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Serp
