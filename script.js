let button = document.querySelector("button");
let state = document.querySelector(".state");
let total = document.querySelector(".Total");
let cases = document.querySelector(".Cases");
let death = document.querySelector(".Deaths");
let input = document.querySelector("input");
let body = document.querySelector("body")
let container = document.querySelector(".container")

let API = " https://api.rootnet.in/covid19-in/stats/latest";
fetch(API)
  .then((Response) => Response.json())
  .then((data) => {
    console.log(data);
    let t = data.data.summary.total;
    let c = data.data.summary.confirmedCasesIndian;
    let d = data.data.summary.deaths;
    let raj = input.value;
    total.textContent = t;
    cases.textContent = c;
    death.textContent = d;

    // Code When button is Clicked
    button.addEventListener("click", () => {
      console.log(input.value);
      let allStatesData = data.data.regional;
      console.log(allStatesData);

      const filteredData = allStatesData.filter(
        (element) => element.loc.toLowerCase() == input.value
      );
      console.log(filteredData);

      if (filteredData.length > 0) {
        state.innerText = input.value.toUpperCase();
        let t = filteredData[0].totalConfirmed;
        let c = filteredData[0].confirmedCasesIndian;
        let d = filteredData[0].deaths;
        total.textContent = t;
        cases.textContent = c;
        death.textContent = d;
      }else {
       // alert("Not Found");
       let div = document.createElement("div");
       div.classList.add("not-found")
       div.textContent = "❌ No data found for the entered state.";
      setTimeout(() => {
        div.style.display = "none"
      }, 3000);
      body.prepend(div);
    }
    
    });
  });
