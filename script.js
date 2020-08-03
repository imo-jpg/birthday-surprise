let container = d3.select("#container");
let figure = container.select("figure");
let title = d3.select("#title");
let article = container.select("article");
let step = article.selectAll(".step");
let divs = step._groups[0];

// initiate the scrollama
let scroller = scrollama();

init();

async function init() {

    let data = await d3.csv("three_things.csv");
    console.log(data);

    for (let i = 0; i < divs.length; i++) {
        divs[i].firstChild.textContent = (data[i].person);
    }

    scroller
    .setup({
        step: "#container article .step",
        offset: 0.65,
        debug: false
    })
    .onStepEnter(response => {
        step.classed("is-active", function(d, i) {
            return i === response.index;
        })
        let thingOne = data[response.index].thingOne;
        let thingTwo = data[response.index].thingTwo;
        let thingThree = data[response.index].thingThree;
        console.log(thingOne);

        figure.select("p").text(`${thingOne}, ${thingTwo}, ${thingThree}`);

    })
    .onStepExit(response => {
        // { element, index, direction }
    });

    // setup resize event
    window.addEventListener("resize", scroller.resize);
}

