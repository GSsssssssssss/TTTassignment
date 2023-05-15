# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\

## Library Used
1. react
2. d3-array
3. recharts
4. stopword

## Functionality

First we Install d3-array and recharts using
`npm i d3`
`npm i recharts`
import the following 

```
import React, { useState } from "react";

import { rollups } from "d3-array";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
```
rollups is used to create nested array 
## Fetching 
decalaring function named handleSubmit() and in it
first to fetch the text from the URL, I am using fetch function using async method to fetch data asynchronously

```
const response = await fetch("https://www.terriblytinytales.com/test.txt");
        const text = await response.text();
```
## Cleaning and Storing
after fetching the data, I clean the data before counting the numbers using regular expression, use .replace() method to remove the punctuations and made all the words lower case using tolowercase() method
and store in the array using rollups
```
 const regex = /[^a-zA-Z0-9\s]/g;
        
        const words =
            // Remove punctuation characters from the string
            text.replace(regex, '').toLowerCase().split(/\s+/);
        const wordCounts = rollups(
            words,
            (value) => value.length,
            (d) => d
        );
 ```
 ## Stopwords
 I also uses the stopword library to clean it more, stopwords can be distracting that's why I remove the stopwords, That's why on page there are two buttons, one will show the chart with stopwords and one will show without stopwords.
 use removeStopwords function from stopword library and then also declaring an array to sort some custom words if needed after that filtering it using filter() method
 
 ```
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
 ```
 
 ## Sorting and getting Top 20 words array
After storing it in an array, we need to sort the data in decending order and after that using Slice method to get top 20 words in the array

```
  const sortedWordCounts = wordCounts.sort((a, b) => b[1] - a[1]);
        const top20WordCounts = sortedWordCounts.slice(0, 20);
        setData(top20WordCounts);
        
```
I declare 2 useState() hooks first for setting data, use to create histogram
and second, a boolean state to show the histogram while clicking show submit button only

```   
    const [data, setData] = useState();
    const [showHistogram, setShowHistogram] = useState(false);
```

## Export function

Declare Export Function as handleExport

```
  const handleExport = () => {
        const csvContent = "data:text/csv;charset=utf-8," + data.map((d) => d.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "histogram_data.csv");
        document.body.appendChild(link);
        link.click();
    };
```

Then creating the frontend part and Plot the chart using Barchart component of recharts

```
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
```

Providing some styling to buttons 

```

.chart{
    display: flex;
    flex-direction: column;
    align-items: center;
    
}
.chart h2{
    font-family: 'Times New Roman', Times, serif;
}

.header{
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-image: linear-gradient(to right, rgb(61, 61, 224), rebeccapurple);
    width: 100%;
    color: aqua;
    font-family: Lucida Handwriting;
    font-size: 20px;
}
.submit_button button{
    background-color: rebeccapurple;
    color : whitesmoke;
    padding: 8px;
    border-radius: 12px;
```

## End Result

![image](https://github.com/GSsssssssssss/TTTassignment/assets/93574391/dd76bf6f-6422-4c39-b754-bd98cbb62ad7)


![image](https://github.com/GSsssssssssss/TTTassignment/assets/93574391/ed512745-7bad-4dbd-ab13-07ee6078e92c)

![image](https://github.com/GSsssssssssss/TTTassignment/assets/93574391/33c3e6d9-1910-49cf-ac17-cd521aadd997)


   

