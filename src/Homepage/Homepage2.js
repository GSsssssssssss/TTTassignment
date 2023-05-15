import React, { useState } from "react";
import './Homepage.css';

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
        <div className="chart">
            <h2>Histogram Without stopwords</h2>
            {!showHistogram && (<div>
            <form onSubmit={handleSubmit} className="submit_button">
                <button type="submit" >Show</button>
            </form></div>)}
            {showHistogram && (
                <div className="chart">
                   
                    <BarChart width={1200} height={250} data={data} barCategoryGap={0}>
                        <XAxis dataKey="0" name="Word" />
                        <YAxis name="Count"/>
                        <Tooltip formatter={(value, name) => (typeof value === 'string' ? [value.split(": ")[1]] : [value])} />
                       
                        <Bar dataKey="1" fill= "#663399" />
                    </BarChart>
                    <button onClick={handleExport} className="export_button">Export to CSV</button>
                </div>
            )}
        </div>
    );
}

export default Histogram2;