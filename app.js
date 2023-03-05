const loadAllData = (sort) => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      // allData = data;
      document.getElementById("spinner").classList.add("d-none");
      showAllData(data.data.tools.slice(0, 6),sort /**.slice(0,6) */);
    });
};


document.getElementById('btn-sort-date')
.addEventListener('click', function(){
  loadAllData(true);
})

//   let fetchData = [];
const showAllData = (aiNames, sort) => {
  console.log(sort);
  console.log(aiNames);
  if (sort === true) {
    aiNames.sort((a,b)=>new Date(a.published_in).getTime() - new Date(b.published_in).getTime())
  }
  const ainameContainer = document.getElementById("ainame-container");
  ainameContainer.innerHTML = "";
  aiNames.forEach((ainame) => {
    // console.log(ainame);
    const div = document.createElement("div");
    // div.classList.add('col');
    div.innerHTML = `       
        <div  class="card w-96 bg-base-100 card-div" style=" height: 540px; padding: 15px; border: 1px solid rgba(0, 0, 0, 0.15);">
        <figure class="px-10 pt-10">
        <img src="${ainame.image}" style="border-radius: 10px; width: 100%; height: 100%;" alt="AIimage" class="rounded-xl" />
        </figure>
        <div class="card-body text-center">
        <h2 class="card-title text-start">Features</h2>        
        <ol style="text-align: start;">
          ${ainame.features.map(feature => `<li>${feature}</li>`)}
        </ol>
        <hr style="width: 300px; border: 1px solid rgba(0, 0, 0, 0.15);">
        <div style="display: flex; justify-content: space-between;">
            <div style="display: flex; flex-direction: column;justify-content: left; align-items: start;">
            <div><h2 class="card-title">${ainame.name}</h2>
            </div>
            <div><p>${ainame.published_in}</p>
            </div>               
            </div>
            <div>
            <button onclick="loadAiData('${ainame.id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style="width: 50px; height: 50px; border-radius: 25px; border: none; background-color: #FEF7F7; display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: pointer;">
            <i style="color: #EB5757;" class="fa-solid fa-arrow-right"></i>
            </button>
            </div>
        </div>
        
        <div class="card-actions">        
        </div>
        </div>
        </div>     
        `;
    ainameContainer.appendChild(div);
  });
};

loadAllData();

const showAllDataTogether = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      // allData = data;
      showAllData(data.data.tools);
    });
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//   single data details ----------------------------------------------

const loadAiData = (id) => {
  // console.log(id);
  const URL = `
    https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(URL)
    .then((res) => res.json())
    .then((aiName) => {
      showSingleAiDetails(aiName);
    });
};


const showSingleAiDetails = (aiInfo) => {
    const modalContainer = document.getElementById("modal-body");
    modalContainer.innerHTML = "";
  console.log(aiInfo);

  const div = document.createElement("div");
  // div.classList.add("modal");
  div.innerHTML = `
  <div class="modal-body">
    <div class="row" style=" display: flex; justify-content: end; text-align: center;">
    <div class="col-md-6" style="border-radius: 10px; background-color: rgba(235, 87, 87, 0.1); border: 1px solid rgba(235, 87, 87, 0.5); padding: 10px;">
      <!-- Left side with name and information -->
      <h5> ${aiInfo.data.description} </h5>
      <div style="display: flex; justify-content: space-around;">
        <div style="height: 110px; width: 130px; background-color: white; border-radius: 10px; display: flex;
        flex-direction: column; justify-content: center; align-items: center; color:#03A30A; font-weight: 700; font-size: 18px;">
          <p>${aiInfo.data.pricing !== null ? (aiInfo.data.pricing[0].price === "0" || "No cost" ? "Free of cost" : aiInfo.data.pricing[0].price) : "No Data Found"}</p>
          <p>${aiInfo.data.pricing !== null ? (aiInfo.data.pricing[0].plan === "Free"? "Free" :  aiInfo.data.pricing[0].plan) : "No Data Found"}</p>          
        </div>
        <div style="height: 110px; width: 130px; background-color: white; border-radius: 10px; display: flex;
        flex-direction: column; justify-content: center; align-items: center; color:#F28927; font-weight: 700; font-size: 18px;">
          <p>${aiInfo.data.pricing !== null ? (aiInfo.data.pricing[1].price === "No cost" ? "Free of cost" : aiInfo.data.pricing[1].price) : "No Data Found"}</p>
          <p>${aiInfo.data.pricing !== null ? (aiInfo.data.pricing[1].plan) : "No Data Found"}</p>
        </div>
        <div style="height: 110px; width: 130px; background-color: white; border-radius: 10px; display: flex;
        flex-direction: column; justify-content: center; align-items: center; color:#EB5757; font-weight: 700; font-size: 18px;">
          <p>${aiInfo.data.pricing !== null ? (aiInfo.data.pricing[2].price) : "No Data Found"}</p>
          <p>${aiInfo.data.pricing !== null ? (aiInfo.data.pricing[2].plan) : "No Data Found"}</p>
        </div>        
      </div>
      <div style="text-align:start; display: flex; justify-content: space-between; padding: 20px;">
        <div>
          <h2>Features</h2>
          <ul>
            <li>${aiInfo.data.features[1].feature_name}</li>
            <li>${aiInfo.data.features[2].feature_name}</li>
            <li>${aiInfo.data.features[3].feature_name}</li>
          </ul>
        </div>
        <div>
        <h2>Integrations</h2>
        <ul>
        ${aiInfo.data.integrations !== null ? aiInfo.data.integrations.map(integrate=>`<li>${integrate}</li>`) : "No Data Found"}  
        </ul>
      </div>       

    </div>
  </div>
  <div class="col-md-6" style=" padding: 10px; border-radius: 10px; border: 1px solid rgba(0, 0, 0, 0.2);">
    <!-- Right side with image -->
    <div  style="position: relative">
    ${aiInfo.data.accuracy.score*100 !== 0? `<button id="modal-img-btn" style="height: 32px; width: 140px; background-color: rgb(235, 87, 87); border-radius: 10px; border: none; color: white; font-weight: 700; position: absolute; top: 5%; right: 15%;"> ${aiInfo.data.accuracy.score*100}% accuracy</button>`:""}
    
    <img  style="width: 400px; border-radius: 10px;" src="${aiInfo.data.image_link[0]}" class="img-fluid" alt="Image">
    </div>      
    <h5 style="text-align: center;"> ${aiInfo.data.input_output_examples !== null ? aiInfo.data.input_output_examples[0].input : "No Data Found"}</h5>
    <p  style="text-align: center;"> ${aiInfo.data.input_output_examples !== null ? aiInfo.data.input_output_examples[0].output : "No Data Found"}</p>
  </div>    
  </div>    
  </div>
        
    `;
  modalContainer.appendChild(div);
};




// style="text-align: center;"
//${aiInfo.data.input_output_examples !== null ? aiInfo.data.input_output_examples[0].input : "No Data Found"}
//${aiInfo.data.integrations.map(integrate=>`<li>${integrate}</li>`)}


//'Do not use it'
//101 previous (aiInfo.data.pricing[0].price === "0" || "No cost" ? "Free of cost" : aiInfo.data.pricing[0].