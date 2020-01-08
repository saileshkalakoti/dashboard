import jsonData from "./../assets/jsondata.json";
import relevanceData from "./../assets/relevance.json"
import likelihoodData from "./../assets/Likelihood.json"
console.log(relevanceData)
export default function formatData(data, columnKey, axis) {
    const allName = data.map(item => item[axis])
    const uniqueTopics = [...new Set(allName)]
    const initialData = uniqueTopics.map( topic => {
        const allValues = data.filter( item => item[axis] === topic).map( item => item[columnKey]);
        const value = (allValues.reduce((a, b) => parseInt(a) + parseInt(b), 0) || 0)/ allValues.length
        return {
            compleObj : data.filter( item => item[axis] === topic),
            graphData: {
            axis: topic,
            id: Math.random(),
            value: parseInt(value)},
        }
    }) 
    return initialData
}

export const filterByTag = (data, tag, tagVal) => data.filter(item => item[tag] === tagVal)

export function getUniqueList( type ) {
    let allKeys = jsonData.map(item => item[type])
    allKeys = allKeys.filter( item => item !=="")
    let uniqueKeys = [...new Set(allKeys)]
    uniqueKeys = ["All"].concat(uniqueKeys)
    return uniqueKeys;
}

export function computeResult (gridData) {
    const sortedData = gridData.map(item => {
        item.compleObj.sort( (a, b) => parseInt(a.intensity) < parseInt(b.intensity) ? 1 : -1)
        return item.compleObj[0]
    })
    console.log(sortedData)
    const gridObject = sortedData.map( item => {
        return getCardInfo (item);
    })
    console.log(gridObject)
    return gridObject
}

export function getNodeData(topic) {
    const topicData = jsonData.filter( item => item.topic === topic);
    topicData.sort( (a, b) => parseInt(a.intensity) < parseInt(b.intensity) ? 1 : -1)

    return topicData[0];
}

export function getCardInfo (item) {
    return {
        relevance: parseInt(item.relevance) ? relevanceData[item.relevance - 1].Meaning : "",
        likelihood: parseInt(item.likelihood) ? likelihoodData[item.likelihood - 1].Meaning : "",
        topic: item.topic,
        title: item.title,
        year: item.start_year,
        intensity: item.intensity,
        url: item.url

    }
}

export function titleCase(str) {
    console.log("here")
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }