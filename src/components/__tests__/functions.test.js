import { formatTime, formatData , filter} from '../../functions'
import testData from './testFilter.json'



it("should only take a viable JSON", () => {
    expect(formatData({})).toEqual(null)
    expect(formatData([])).toEqual(null)
    expect(formatData("why would it be a string")).toEqual(null)
    expect(formatData(1337)).toEqual(null)
})

// check duration formatting 

const durationCases = [[-1, null], [undefined, null],[{}, null], [0, null]]

describe("test clip duration formatting from JSON", () => {
    test.each(durationCases)(
        "given -1, undefined, {}, or 0, returns null",
        (input, expectedNull) => {
            const result = formatTime(input)
            expect(result).toEqual(expectedNull)
        }
    )
})


// check filter function 

// format data for manually checking filters 

const testArr = []

testData["data"].forEach((item) => {
    testArr.push(formatData(item))
})


// general filter check 

it("should give all videos", () => {
    expect(filter(testArr, "anyDate", "anyDuration", "anyFeatured")).toEqual(testArr)
})

// check date filter

it("should give only videos uploaded within 365 days", () => {
    expect(filter(testArr, "365", "anyDuration", "anyFeatured")).toEqual([testArr[0], testArr[1], testArr[2]])
})

it("should give only videos uploaded within 30 days", () => {
    expect(filter(testArr, "30", "anyDuration", "anyFeatured")).toEqual([testArr[0], testArr[1]])
})

it("should give only videos uploaded within 7 days", () => {
    expect(filter(testArr, "7", "anyDuration", "anyFeatured")).toEqual([testArr[0]])
})

// check duration filter

it("should give only videos < 4 minutes", () => {
    expect(filter(testArr, "anyDate", "short", "anyFeatured")).toEqual([testArr[0]])
})

it("should give only videos between 4 and 10 minutes", () => {
    expect(filter(testArr, "anyDate", "med", "anyFeatured")).toEqual([testArr[1]])
})

it("should give only videos > 10 minutes", () => {
    expect(filter(testArr, "anyDate", "long", "anyFeatured")).toEqual([testArr[2], testArr[3]])
})

// Check featured filter  

it("should give only a featured video", () => {
    expect(filter(testArr, "anyDate", "anyDuration", "featured")).toEqual([testArr[0]])
})









