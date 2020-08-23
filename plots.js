// demographic information panel:
//function with drop down menu:
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");
    //demographic information panel:
    PANEL.html("");
    PANEL.append("h6").text(`ID:${result.id}`);
    PANEL.append("h6").text(`ethnicity :${result.ethnicity}`);
    PANEL.append("h6").text(`Gender:${result.gender}`);
    PANEL.append("h6").text(`Age:${result.age}`);
    PANEL.append("h6").text(`Location:${result.location}`)
    PANEL.append("h6").text(`bbtype:${result.bbtype}`);
    PANEL.append("h6").text(`wfred:${result.wfreq}`)
    });
  }

function buildCharts(newSample) {

    barChart(newSample)
    gaugeChart(newSample)
   bubbleChart(newSample)
}

   // Build bar chart:
   function barChart(sample){
    d3.json("samples.json").then((data) => {
      var samples= data.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var x_axis =result.sample_values.slice(0,10).reverse();
      var y_axis=result.otu_ids.slice(0,10).map(otuID=> "OTU " + otuID.toString()).reverse();
      //Plotting bar chart"
      var trace = {
        x: x_axis,
        y: y_axis,
        text: result.otu_labels.reverse(),
        type: 'bar',
        orientation: 'h',
        marker: {
            color: 'rgba(255,153,51,0.6)',
            width: 1
        }
      };
      var data = [trace]
      
      Plotly.newPlot("bar",data);
    });
  };

  //Build Bubble chart:
  function bubbleChart(Sample){
    d3.json("samples.json").then((data) => {
      var samples= data.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.id ==Sample);
      var result = resultArray[0];
      var X_axis = result.otu_ids;
      var Y_axis = result.sample_values;
      var label = result.otu_labels;
      //plot bubble chart:
      var tarce1 = {

        x:X_axis,
        y: Y_axis,
        text: label,
        mode: 'markers',
        marker: {
          color: X_axis,
          color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
          opacity: [1, 0.8, 0.6, 0.4],
          size: [40, 60, 80, 100],
          size: Y_axis 
        }
        
      };

      var data =[tarce1]
  
      var layout = {
        title: "Belly Button  Bacterial species",
        showlegend: false,
        xaxis: { title: "OTU ID"},
        yaxis: { title: "Sample Values"}
      };
      
      Plotly.newPlot("bubble",data, layout);
    });
  }  

 // Build gauge chart:
 function gaugeChart(Sample){
  d3.json("samples.json").then((data) => {
    var samples= data.metadata;
    var resultArray = samples.filter(sampleObj => sampleObj.id == Sample);
    var result = resultArray[0];
    //plot gauge chart:
    var trace2 = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: result.wfreq,
        title: "Belly Button Washing Scrubs per Week",
        type: 'indicator',
        mode: 'gauge+number',
        gauge: {
          bar: {color: "heatmap"},
          axis: {range: [0,9]},
          steps: [
            {range: [0,2], color: "rgb(20, 20, 20)"},
            {range: [2,4], color:"rgb(40, 40, 40)"},
            {range: [4,6], color: "rgb(80, 80, 80)"},
            {range: [6,8], color: "rgb(120, 120, 120)"},
            {range: [8,9], color: "rgb(140, 140, 140)"}  
          ]
          }
      }
    ]; 
    var data2 = [trace2]
    var layout = { 
      width: 600, height: 450, margin: { t: 0, b: 0 } 
    };
  
    Plotly.newPlot('gauge',trace2, layout)
  });
}

//Pqge initialize:
function init() {
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
        selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    const firstSample=sampleNames[0]
    buildCharts(firstSample);
    buildMetadata(firstSample)
})}

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

init();
