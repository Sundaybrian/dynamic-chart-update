

// configg for the chart
configg = {
type: 'doughnut',
data: {
  labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
  datasets: [{
    label: "Population (millions)",
    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
    data: []
  }]
},
options: {
  title: {
    display: true,
    text: 'Predicted world population (millions) in 2050'
  }
}
};


var rootRef2 = firebase.database().ref().child("HistoryChart");
// console.log(rootRef2);

// confirming the i am receiving the right object
rootRef2.on('value', function(snap) {
  console.log(snap.val(), "snap history");
});

// add() function to update the chart values
function addData() {

var chartArray = [];//empty array to store the data from firebase
var key;

  rootRef2.on('child_added', function(data) {
    // loopig through the singles object and pushing the value to the array
    for (var key in data.val()) {
      if (data.val().hasOwnProperty(key)) {
        chartArray.push(data.val()[key]);
  console.log(chartArray);
      }
    }
    // looping through the array and pushing to the empty data[]
    chartArray.forEach(function(datac){

      configg.data.datasets[0].data.push(datac);

    });

    document.myDoughnut.update();//updating the doughnut
  });
  //onchild added end
}
// add() function




$(document).ready(function(){

var ctx2 = document.getElementById("chart2");
document.myDoughnut = new Chart(ctx2, configg);
addData();

}); //ready



// function resize() {
//   var w = Math.random() * 300 + 100;
//   var h = Math.random() * 300 + 100;
//   document.getElementById('chart2').style.width = w + 'px';
//   document.getElementById('chart2').style.height = h + 'px';
//   chart.invalidateSize();
// }
