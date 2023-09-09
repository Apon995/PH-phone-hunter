let cardContainer = document.getElementById("cardContainer");
let showAllbtn = document.getElementById("showAllbtn");
let modalContainer = document.getElementById("modalContainer");
let notFound = document.getElementById("notfound");

let isShow = false;
let phName = "iphone";
const loadData = async (name, sort = false) => {
  if (name !== undefined) {
    phName = name;
  }
  isShow = sort;
  try {
    let response = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${
        name === undefined ? phName : name
      }`
    );

    let data = await response.json();

    let phones = data.data;

    if (data.status == true) {
      notFound.classList.add("hidden");
      if (phones.length >= 6 && !isShow) {
        showAllbtn.classList.remove("hidden");
      } else {
        showAllbtn.classList.add("hidden");
      }

      if (!isShow) {
        phones = phones.slice(0, 6);
      }

      phones.forEach((phone) => {
        let div = document.createElement("div");
        div.classList.add(
          "px-4",
          "py-3",
          "border-[1px]",
          "rounded-lg",
          "border-[#CFCFCF]"
        );
        div.innerHTML = `<div>
        <div class="bg-[#0d6efd0d] py-2 rounded-lg">
            <img src="${phone.image}" alt="image phone" class="mx-auto">
        </div>
        <br>
        <div class="text-center space-y-6">
            <h1 class="text-[#403F3F] text-2xl font-semibold ">Brand : ${
              phone?.brand || "no available"
            }</h1>
        <h3 class="text-[#706F6F] text-xl font-medium">${
          phone?.phone_name || "no available"
        } </h3>
        <button class="bg-[#0D6EFD] text-[#FFF] text-base font-medium px-4 py-2  rounded-md " onclick="showDetails('${
          phone.slug
        }')">show Details</button>
        </div>
       </div>`;

        cardContainer.appendChild(div);
      });
    } else {
      showAllbtn.innerHTML = "";

      notFound.classList.remove("hidden");
    }
  } catch (error) {
    console.error(error);
  }
};

const showDetails = async (Id) => {
  let response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${Id}`
  );
  let data = await response.json();

  let { slug, name, releaseDate, brand, image } = data?.data;
  let { storage, displaySize, chipSet, memory } = data.data?.mainFeatures;

  modalContainer.innerHTML = `

 <div class="bg-[#0d6efd0d] py-2 rounded-lg ">
 <img src="${image}" alt="image phone" class="mx-auto w-[85px]">
</div>
<div class="space-y-1 mt-[2px]">
  <h1 class="text-[#3c3c3c] text-xl font-bold ">${
    name || "i phone 13 pro max"
  }</h1>
<p class="text-[#403F3F] text-base"> storage : <span class="text-[#706F6F] text-sm">${
    storage || "something worng"
  } </span></p>
<p class="text-[#403F3F] text-base"> Display Size : <span class="text-[#706F6F] text-sm">${
    displaySize || "display size not available"
  } </span></p>
<p class="text-[#403F3F] text-base"> Chipset : <span class="text-[#706F6F] text-sm">${
    chipSet || "no avaiable right now"
  } </span></p>
<p class="text-[#403F3F] text-base"> Memory : <span class="text-[#706F6F] text-sm">${
    memory || "memoray not support"
  } </span></p>
<p class="text-[#403F3F] text-base"> Slug  : <span class="text-[#706F6F] text-sm">${
    slug || "id num is't available"
  } </span></p>
<p class="text-[#403F3F] text-base"> Brand : <span class="text-[#706F6F] text-sm">${
    brand || ""
  } </span></p>
<p class="text-[#403F3F] text-base"> GPS : <span class="text-[#706F6F] text-sm">${
    data.data?.others?.GPS || "No Gps available"
  } </span></p>
<p class="text-[#403F3F] text-base"> Release Date : <span class="text-[#706F6F] text-sm">${
    releaseDate || "not available"
  } </span></p>

</div>


 `;
  my_modal_5.showModal();
};

const searchByname = () => {
  let text = document.getElementById("searchbar").value;
  if (text === "") {
    return;
  }
  cardContainer.innerHTML = "";

  loadData(text);

  document.getElementById("searchbar").value = "";
};

document.getElementById("searchbar").addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    searchByname();
  }
});

loadData();
