const searchButton = document.getElementById("searchButton");
var inputText = document.getElementById("inputText")
const countryFlag = document.getElementById("countryFlag")
const ascSortButton = document.getElementById("ascSortButton");
const ascPageButtonContainer = document.getElementById("ascPageButtonContainer");
const descSortButton = document.getElementById("descSortButton");
var CounButtonContainer = document.querySelector(".CounButtonContainer")
const countryDetailCountainer = document.getElementById("countryDetailContainer");
const pageRow = document.getElementById("pageRow")
const pageRowChangeBtn = document.getElementById("pageRowChangeBtn");
var allCountriesName = [];
let pageIndex = 1;
let isLoaded = false;

// console.log(countryDetailCountainer)
fetch(`https://restcountries.com/v3.1/all`)
.then((res)=>res.json())
.then((res1)=>{
isLoaded = true;
res1.forEach(function(res2){
    allCountriesName.push(res2.name.official);
    
})

// for changing amount of rows per page

pageRowChangeBtn.addEventListener("click",function(){
    console.log(CounButtonContainer.children.length)
    let removeCount = CounButtonContainer.children.length;
    let removePageButton = ascPageButtonContainer.children.length;
    currentPageRow = pageRow.value;
    console.log(currentPageRow);
    // CounButtonContainer.children[3].remove();
    for(i=0;i<removeCount;i++){
        // CounButtonContainer.children[i].remove();
        CounButtonContainer.removeChild(CounButtonContainer.firstElementChild)
    }
    for(i=0;i<pageRow.value;i++){
        let newButton = document.createElement("Button");
        newButton.innerHTML =(i+1)+" " + allCountriesName[i];
        newButton.addEventListener("click",function(){
            let splitText = newButton.innerHTML.split(" ");
            let filterText = "";
            for(i=1;i<splitText.length;i++){
                if(i==1){
                    filterText = filterText.concat(splitText[i]);
                }
                else{
                    filterText = filterText.concat(" ",splitText[i])
                    
                }
            }
            let finalURL2 = `https://restcountries.com/v3.1/name/${filterText}?fullText=true`;
            fetch(finalURL2)
            .then((res)=>res.json())
            .then((res1)=>{
            console.log(res1)
            countryDetailCountainer.children[0].src = `${res1[0].flags.png}`
            countryDetailCountainer.children[1].innerHTML = "Country Name: " + `${res1[0].name.official}`
            countryDetailCountainer.children[2].innerHTML = "2 character country code: "+ `${res1[0].cca2}`
            countryDetailCountainer.children[3].innerHTML ="3 character country code: "+ `${res1[0].cca3}`
            countryDetailCountainer.children[4].innerHTML = "Common: "+ `${Object.values(res1[0].name.nativeName)[0].common}`
            countryDetailCountainer.children[5].innerHTML ="Alternative country name: "+ `${res1[0].altSpellings}`
            countryDetailCountainer.children[6].innerHTML ="Country calling code: "+ `${res1[0].idd.root + res1[0].idd.suffixes[0]}`
            countryDetailCountainer.classList.remove("hidden");
        
    })
        })
        CounButtonContainer.appendChild(newButton);
    }

//for page button
for(i=0;i<25;i++){
    CounButtonContainer.children[i].innerHTML =(i+1)+" " + allCountriesName[i];
}
for(i=0;i<25;i++){
    let childIndex = i;
    CounButtonContainer.children[i].addEventListener('click',function(){
        let splitText = CounButtonContainer.children[childIndex].innerHTML.split(" ");
        let filterText = "";
        for(i=1;i<splitText.length;i++){
            if(i==1){
                filterText = filterText.concat(splitText[i]);
            }
            else{
                filterText = filterText.concat(" ",splitText[i])
                
            }
        }
        console.log(filterText)
        let finalURL2 = `https://restcountries.com/v3.1/name/${filterText}?fullText=true`;
        fetch(finalURL2)
        .then((res)=>res.json())
        .then((res1)=>{
        console.log(res1)
        countryDetailCountainer.children[0].src = `${res1[0].flags.png}`
        countryDetailCountainer.children[1].innerHTML = "Country Name: " + `${res1[0].name.official}`
        countryDetailCountainer.children[2].innerHTML = "2 character country code: "+ `${res1[0].cca2}`
        countryDetailCountainer.children[3].innerHTML ="3 character country code: "+ `${res1[0].cca3}`
        countryDetailCountainer.children[4].innerHTML = "Common: "+ `${Object.values(res1[0].name.nativeName)[0].common}`
        countryDetailCountainer.children[5].innerHTML ="Alternative country name: "+ `${res1[0].altSpellings}`
        countryDetailCountainer.children[6].innerHTML ="Country calling code: "+ `${res1[0].idd.root + res1[0].idd.suffixes[0]}`
        countryDetailCountainer.classList.remove("hidden");
    
})
    })
}
})

searchButton.addEventListener('click',function(){
    console.log(inputText.value);
    let inputText1 = `${inputText.value}`;
    let finalURL = `https://restcountries.com/v3.1/name/${inputText1}?fullText=true`
    fetch(finalURL)
    .then((res)=>res.json())
    .then((res1)=>{
    console.log(res1)
    // console.log(res1[0].flags.png);
    // console.log(countryFlag);
    countryDetailCountainer.children[0].src = `${res1[0].flags.png}`
    // console.log(res1[0].name.official);
    countryDetailCountainer.children[1].innerHTML = "Country Name: " + `${res1[0].name.official}`
    // console.log(res1[0].cca2);
    countryDetailCountainer.children[2].innerHTML = "2 character country code: "+ `${res1[0].cca2}`
    // console.log(res1[0].cca3);
    countryDetailCountainer.children[3].innerHTML ="3 character country code: "+ `${res1[0].cca3}`
    // console.log(res1[0].name.nativeName);
    console.log(Object.values(res1[0].name.nativeName)[0].common);
    countryDetailCountainer.children[4].innerHTML = "Common: "+ `${Object.values(res1[0].name.nativeName)[0].common}`
    // console.log(res1[0].altSpellings);
    countryDetailCountainer.children[5].innerHTML ="Alternative country name: "+ `${res1[0].altSpellings}`
    console.log(res1[0].idd);
    countryDetailCountainer.children[6].innerHTML ="Country calling code: "+ `${res1[0].idd.root + res1[0].idd.suffixes[0]}`
    countryDetailCountainer.classList.remove("hidden")
    
})
})
function compareAB(a,b){
    if(a < b){
        return -1;
    }
    if(b < a){
        return 1;
    }
    return 0;
}
function compareABDes(a,b){
    if(a < b){
        return 1;
    }
    if(b < a){
        return -1;
    }
    return 0;
}

ascSortButton.addEventListener('click',function(){
    allCountriesName.sort(compareAB);
})
descSortButton.addEventListener('click',function(){
    allCountriesName.sort(compareABDes)
})
for(i=0;i<ascPageButtonContainer.children.length;i++){
    let pageIndex1 = i;
    ascPageButtonContainer.children[i].addEventListener('click',function(){
        if(isLoaded == true){

            for(k=pageIndex1*currentPageRow;k<pageIndex1*parseFloat(currentPageRow)+parseFloat(currentPageRow);k++){
                // console.log(k)
                // console.log(allCountriesName[k])
                CounButtonContainer.children[k-parseFloat(currentPageRow)*pageIndex1].innerHTML = `${k+1}`+" "+`${allCountriesName[k]}`;
            }
        }
    })
}

// console.log(ascPageButtonContainer.children.length)
