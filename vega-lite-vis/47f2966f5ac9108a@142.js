import define1 from "./26670360aa6f343b@202.js";
import define2 from "./a2166040e5fb39a6@229.js";
import define3 from "./4f6f1c9bd687e945@691.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Vega-Lite Explorations
For CS630...`
)});
  const child1 = runtime.module(define1);
  main.import("vl", child1);
  const child2 = runtime.module(define2);
  main.import("fromColumns", child2);
  main.import("printTable", child2);
  const child3 = runtime.module(define3);
  main.import("data", child3);
  main.variable(observer()).define(["md","data"], function(md,data){return(
md`The data is has ${data.length} rows and ${
  Object.keys(data[0]).length
} columns! We're working with countries and population data`
)});
  main.variable(observer()).define(["vl","data"], function(vl,data){return(
vl
  .markPoint()
  .data(data)
  .encode(
    vl.y().fieldQ("pop"),
    vl.x().fieldN("country"),
    vl.color().fieldN("country"),
    vl.tooltip(["life_expect", "fertility"])
  )
  .render()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`This graph doesn't seem to mean anything...

**Encoding Channels**
At the heart of Vega-Lite is the use of encodings that bind data fields (with a given data type) to available encoding channels of a chosen mark type. In this notebook we'll examine the following encoding channels:

- **x**: Horizontal (x-axis) position of the mark.
- **y**: Vertical (y-axis) position of the mark.
- **size**: Size of the mark. May correspond to area or length, depending on the mark type.
- **color**: Mark color, specified as a legal CSS color.
- **opacity**: Mark opacity, ranging from 0 (fully transparent) to 1 (fully opaque).
- **shape**: Plotting symbol shape for point marks.
- **tooltip**: Tooltip text to display upon mouse hover over the mark.
- **order**: Mark ordering, determines line/area point order and drawing order.
- **column**: Facet the data into horizontally-aligned subplots.
- **row**: Facet the data into vertically-aligned subplots.

For a complete list of available channels, see the Vega-Lite encoding documentation.
https://vega.github.io/vega-lite/docs/mark.html`
)});
  main.variable(observer("data21cent")).define("data21cent", ["data"], function(data){return(
data.filter((d) => d.year >= 2000)
)});
  main.variable(observer()).define(["printTable","data21cent"], function(printTable,data21cent){return(
printTable(data21cent.slice(0, 10))
)});
  main.variable(observer()).define(["vl","data21cent"], function(vl,data21cent){return(
vl
  .markPoint()
  .data(data21cent)
  .encode(
    vl.x().fieldQ("fertility").scale({ zero: false, nice: false }),
    vl.y().fieldQ("life_expect").scale({ zero: false, nice: false }) // the nice makes it bind to factors of 5, 10s and adds padding
  )
  .render()
)});
  main.variable(observer()).define(["vl","data21cent"], function(vl,data21cent)
{
  // create an interval selection over an x-axis encoding
  const brush = vl.selectInterval().encodings("x");

  // determine opacity based on brush
  const opacity = vl.opacity().if(brush, vl.value(0.6)).value(0.1);

  // an overview histogram of cars per year
  // add the interval brush to select cars over time
  const overview = vl
    .markBar({ color: "firebrick" })
    .encode(
      vl.x().fieldN("country").axis({ title: null, labelAngle: 0 }), // no title, no label angle
      vl.y().count().title(null), // counts, no axis title
      vl.color().fieldN("cluster"),
      opacity // modulate bar opacity based on the brush selection
    )
    .params(brush) // add interval brush selection to the chart
    .width(400) // use the full default chart width
    .height(50); // set chart height to 50 pixels

  // a detail scatterplot of horsepower vs. mileage
  const detail = vl.markPoint({ filled: true }).encode(
    vl.x().fieldQ("life_expect").scale({ zero: false }),
    vl.y().fieldQ("fertility"),
    // vl.color().fieldN("country"),
    vl.color().fieldN("cluster"),
    // vl.shape().fieldN("cluster"),
    vl.size({ legend: null }).fieldN("pop").scale({ type: "log" }),
    vl.tooltip(["country", "pop", "life_expect", "fertility"]),
    vl.order().fieldQ("pop").sort("descending"), // this makes sure the smaller data points are rendered later, so when you hover you can see the small ones
    opacity // modulate point opacity based on the brush selection
  );

  // vertically concatenate (vconcat) charts
  return vl.data(data21cent).vconcat(overview, detail).render();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`We can make this look a lot better like this.`
)});
  main.variable(observer("graph")).define("graph", function(){return(
Array(4) [
  {
      type: "darker-skinned women",
      gender: "female",
      percentage: 35,
    },
   {
      type: "darker-skinned men",
      percentage: 17,
      gender: "male",
    },
    {
      type: "lighter-skinned women",
      percentage: 7,
      gender: "female",
    },
    {
      type: "lighter-skinned men",
      percentage: 1,
      gender: "male",
    }
  ]
)});
  main.variable(observer()).define(["print","graph"], function(print,graph){return(
print(graph)
)});
  return main;
}
