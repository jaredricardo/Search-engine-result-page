UX engineering internship take home test by Jared Ricardo

Instructions:  

1. Unzip JaredRicardoSerp 

2. cd JaredRicardoSerp

3. `npm install` 

------------------

To run project: 

4a. `npm start`

To run unit tests: 

3b.`npm test`


Comments: 

The SERP I built takes several filtering and sorting options, which all work to dynamically filter JSON results. The Vimeo search page (as far as I saw) did not include the ability to pre-select filter or sorting options. I wanted my SERP to have that ability, so I wrote them into state and passed them through a format function. 

Additionally, in my implementation, the results are initialized from the supplied JSON data, instead of brought in after an API call. In practice, I'm sure I would start with a result state set to an empty array, then filter and populate it with the response from Vimeo's API. Given the instructions and data, this felt like the most efficient method for achieving the results, though again, not necessarily what I would do in practice. 

It's worth mentioning that the searching was originally done via a fuzzy searching function on the clip names and clip description. In the end, I felt this wasn't what the assignment was asking. I removed the fuzzy search and simply implemented the pre-populated state as mentioned above. 

As far as testing goes, I only had time to do some small unit testing of the functions using Jest. I would have liked to use Jest to also do some E2E or component testing, but time got way from me. 

My SERP is responsive down to a device width of 375px and is navigable with just a keyboard (search bar is autofocused, then tabs, arrow keys, and enter can be used in a downward flow to navigate / filter results).
