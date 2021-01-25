import React from 'react'

import { Col } from 'react-bootstrap'
import styled from 'styled-components'
import {Comment} from '@styled-icons/boxicons-solid/Comment'
import {Play} from '@styled-icons/boxicons-regular/Play'
import Moment from 'react-moment'

import { formatTime } from '../functions'

const Whitecomment = styled(Comment)`
    padding-right: 5px; 
    color: white;
    height: 60%;
    width: auto;
`
const Whiteplay = styled(Play)`
    padding-bottom: 3px;
    color: white;
    height: 100%;
    width: auto;
`

export default function Video(video) {
    const duration = formatTime(video.duration)
    const featured = (video.featured) ? "featured result-box" : "result-box"
    return (
      <Col xl={4} lg={4} md={6} sm={6} xs={12} className="p-0 m-0" key={video.videoID} data-testid="video-test"> 

        <div className={featured}>  
            <div className="thumbnail-wrapper">                        
                <div className="detail-container"> 
                    <div className="hover-details">
                        <div className="ago"> 
                            <span> <Moment fromNow ago>{video.created}</Moment> ago </span>
                        </div>
                        
                        <div className="plays"> 
                            <Whiteplay />
                            <span>{video.plays}</span>
                        </div>
                    
                        <div className="comments">
                            <Whitecomment />
                            <span>{video.comments}</span>
                        </div>
                        
                        <div className="duration">
                            <span>{duration}</span>
                        </div>
                    </div>
                    
                </div>

                <a href={video.URLformat}>
                    <img src={video.pictures} className="thumbnail" alt="thumbnail"/>
                </a>

            </div>
            <div className="info-container"> 
                <div className="video-title"> 
                    <a href={video.URLformat}>{video.name}</a> 
                </div>
                <div className="user-link"> 
                    <a href={video.userLink}> {video.user}</a> 
                </div>   
            </div>
        </div>
        </Col>
    )
}
