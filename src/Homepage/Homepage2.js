import React, { useState } from "react";
// import { csvParseRows } from "d3-dsv";
import { rollups } from "d3-array";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

import stopword, {removeStopwords} from 'stopword';
const Histogram2=() => {
    const [showHistogram, setShowHistogram] = useState(false);
    const [data, setData] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("https://www.terriblytinytales.com/test.txt");
        const text = await response.text();
        // Define the regular expression to remove all punctuation characters
        const regex = /[^a-zA-Z0-9\s]/g;
         const stopwords = ['a', 'an', 'the', 'and', 'or', 'but'];
        const words =
            // Remove punctuation characters from the string
           removeStopwords( text.replace(regex, '').toLowerCase().split(/\s+/).filter(word => !stopwords.includes(word)));
        const wordCounts = rollups(
            words,
            (value) => value.length,
            (d) => d
        );
        console.log(wordCounts);
        const sortedWordCounts = wordCounts.sort((a, b) => b[1] - a[1]);
        const top20WordCounts = sortedWordCounts.slice(0, 20);
        setData(top20WordCounts);
        setShowHistogram(true);
    };


    const handleExport = () => {
        const csvContent = "data:text/csv;charset=utf-8," + data.map((d) => d.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "histogram_data.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div>
            <h1>Without stopwords</h1>
            {!showHistogram && (<div>
            <form onSubmit={handleSubmit}>
                <button type="submit" >Submit</button>
            </form></div>)}
            {showHistogram && (
                <div>
                   
                    <BarChart width={1500} height={500} data={data}>
                        <XAxis dataKey="0" />
                        <YAxis />
                        <Tooltip formatter={(value, name) => (typeof value === 'string' ? [value.split(": ")[1]] : [value])} />
                       
                        <Bar dataKey="1" fill= "#663399" />
                    </BarChart>
                    <button onClick={handleExport}>Export</button>
                </div>
            )}
        </div>
    );
}

export default Histogram2;