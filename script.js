let container = d3.select("#container");
let figure = container.select("figure");
let title = d3.select("#title");
let article = container.select("article");

// initiate the scrollama
let scroller = scrollama();

init();

async function init() {

    let data = await d3.csv("three_things.csv");

    for (let j = 0; j < data.length; j++) {
        article.append("div");
        let list = d3.selectAll("div")._groups[0];
        
        for (let k = 0; k < list.length; k++) {
            list[k].classList.add("step");
        }

    }

    let step = article.selectAll(".step");
    let divs = step._groups[0];

    for (let i = 0; i < divs.length; i++) {
        divs[i].textContent = (data[i].person);
    }

   


    scroller
    .setup({
        step: "#container article .step",
        offset: 0.85,
        debug: false
    })
    .onStepEnter(response => {
        step.classed("is-active", function(d, i) {
            return i === response.index;
        })
        let thingOne = data[response.index].thingOne;
        let thingTwo = data[response.index].thingTwo;
        let thingThree = data[response.index].thingThree;

        let footnoteOne = data[response.index].footnoteOne;

        let id = data[response.index].person;

        figure.select("p").text(`${thingOne}, ${thingTwo}, ${thingThree}`);
        figure.select("p").attr("id", `${id}`);

        figure.select("#extra").text(footnoteOne);


        // let Annika = d3.select("#Annika")._groups[0][0];

        // Annika.addEventListener("mouseover", function() {
        //     console.log("hovered");
        //     d3.select("#extraAnnika").classed("show", true);
        // })
        // Annika.addEventListener("mouseout", function() {
        //     d3.select("#extraAnnika").classed("show", false);
        // })


        

    })
    .onStepExit(response => {
        // figure.select("#extraAnnika").classed("show", false);

    });
}

