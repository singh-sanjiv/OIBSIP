/*
------------------------------------
    : Custom - Piety Charts js :
------------------------------------
*/
"use strict";
$(document).ready(function () {
  /* -- Piety - Line Chart -- */
  $(".piety-line").peity("line", {
    width: 50,
    height: 30,
    fill: ["rgba(4,66,186,0.5)"],
    stroke: "#43b1ff",
  });
  /* -- Piety - Updating Chart -- */
  var updatingChart = $(".piety-updating-chart").peity("line", {
    width: 70,
    height: 30,
    fill: ["rgba(4,66,186,0.5)"],
    stroke: "#43b1ff",
  });
  setInterval(function () {
    var random = Math.round(Math.random() * 10);
    var values = updatingChart.text().split(",");
    values.shift();
    values.push(random);
    updatingChart.text(values.join(",")).change();
  }, 1000);
  /* -- Piety - Bar Chart -- */
  $(".piety-bar").peity("bar", {
    width: 50,
    height: 30,
    padding: 0.2,
    fill: ["#43b1ff", "#f4f5f7", "#9ccc34"],
  });
  /* -- Piety - Pie Chart -- */
  $(".piety-pie").peity("pie", {
    width: 40,
    height: 40,
    fill: ["#43b1ff", "#f4f5f7", "#9ccc34", "#08d26f"],
  });
  /* -- Piety - Donut Chart -- */
  $(".piety-donut").peity("donut", {
    width: 40,
    height: 40,
    fill: ["#43b1ff", "#f4f5f7", "#9ccc34", "#08d26f"],
  });
  /* -- Piety - Data Attributes Chart -- */
  $(".piety-data-attributes span").peity("donut");
});
