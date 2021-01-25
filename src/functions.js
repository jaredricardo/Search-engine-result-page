export function formatData(video) {

    const clip = video["clip"] 

    if(clip === undefined) {
        return null
    }

    const largestImage = clip["pictures"]["sizes"].length - 1

    // I felt that re-writing the data in this object array format helped me reason more clearly when mapping
    // and generally manipulating the data for rendering. 

    return {
        name: clip.name,
        description: clip.description,
        uri: clip.uri,
        videoID: clip.uri.slice(8), 
        created: clip.created_time, 
        featured: video.is_featured,
        URLformat: "https://vimeo.com/" + video["clip"].uri.slice(8),
        language: clip.language,
        duration: clip.duration,
        plays: clip["stats"].plays,
        comments: clip["metadata"]["connections"]["comments"].total,
        user: clip["user"].name,
        userLink: clip["user"].link,
        pictures: clip["pictures"]["sizes"][largestImage].link
    }
}


// sorting logic

export function sort(results, sortType) {

    if(sortType === "Popularity"){
        results.sort((a,b) => { 
            return (a.plays > b.plays) ? -1 : 1   //had to use plays because # favorites was not provided in example data 
        })
    } 
    if(sortType === "TitleAZ"){
        results.sort((a,b) => { 
            return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1
        })
    } 
    if(sortType === "TitleZA"){
        results.sort((a,b) => { 
            return (a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : 1
        })
    } 
    if(sortType === "Longest"){
        results.sort((a,b) => { 
            return (a.duration > b.duration) ? -1 : 1
        })
    } 
    if(sortType === "Shortest"){
        results.sort((a,b) => { 
            return (a.duration > b.duration) ? 1 : -1
        })
    } 
    if(sortType === "Newest"){
        results.sort((a,b) => { 
            return (a.created > b.created) ? -1 : 1
        })
    } 
    if(sortType === "Oldest"){
        results.sort((a,b) => { 
            return (a.created > b.created) ? 1 : -1
        })
    } 
    if(sortType === "UserAZ"){
        results.sort((a,b) => { 
            return (a.user.toLowerCase() > b.user.toLowerCase()) ? 1 : -1
        })
    } 
    if(sortType === "UserZA"){
        results.sort((a,b) => { 
            return (a.user.toLowerCase() > b.user.toLowerCase()) ? -1 : 1
        })
    } 
    return results
}

// filtering logic 

function filterDate(currentResults, currentFilter){

    const rightNow = Date.now()
    const week = 7 * 86400000       //miliseconds in a day 
    const month = 30 * 86400000
    const year = 365 * 86400000 

    if(currentFilter === "anyDate") {
        return currentResults
    }
    if(currentFilter === "365") {
        return currentResults.filter(result => rightNow - Date.parse(result.created) <  year)
    }
    if(currentFilter === "30") {
       return currentResults.filter(result => rightNow - Date.parse(result.created) <  month)
    }
    if(currentFilter === "7") {
      return currentResults.filter(result => rightNow - Date.parse(result.created) <  week)
    }
}

function filterDuration(currentResults, currentFilter) {
    
    if (currentFilter === "anyDuration") {
        return currentResults
    }
    if (currentFilter === "short") {
        return currentResults.filter(result => result.duration < 240)
    }
    if (currentFilter === "med") {
        return currentResults.filter(result => result.duration > 240 && result.duration < 600)
    }
    if (currentFilter === "long") {
        return currentResults.filter(result => result.duration > 600)
    }
}

function filterFeatured(currentResults, currentFilter){

    if(currentFilter === "anyFeatured") {
        return currentResults
    } 
    if(currentFilter === "featured") {
       return currentResults.filter(result => (result.featured))
    }
}


export function filter(results, dateFilter, durationFilter, featuredFilter){

    return filterDate(filterFeatured(filterDuration(results, durationFilter), featuredFilter), dateFilter)

}

export function formatTime (seconds) {
    if(seconds <= 0 || isNaN(seconds)) return null
    const duration = new Date(null)
    duration.setSeconds(seconds)
    const result = duration.toISOString().substr(11, 8)
    return seconds >= 3600  ? result : result.slice(3)
}