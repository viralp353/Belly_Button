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
