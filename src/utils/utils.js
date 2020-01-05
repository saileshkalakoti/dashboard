import jsonData from "./../jsondata.json";
export default function formatData(data, columnKey) {
    const allName = data.map(item => item.topic)
    // console.log(allName)
    const uniqueTopics = [...new Set(allName)]
    // console.log(uniqueTopics)
    const initialData = uniqueTopics.map( topic => {
        const allValues = data.filter( item => item.topic === topic).map( item => item[columnKey]);
        const value = (allValues.reduce((a, b) => parseInt(a) + parseInt(b), 0) || 0)/ allValues.length
        // console.log(value)
        return {
            axis: topic,
            value: parseInt(value)
        }
    }) 
    return initialData
}

export const filterByTag = (data, tag, tagVal) => data.filter(item => item[tag] === tagVal)

export function getUniqueList( type ) {
    const allKeys = jsonData.map(item => item[type])
    const uniqueKeys = [...new Set(allKeys)]
    return uniqueKeys;
}
