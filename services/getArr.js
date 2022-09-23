


function getArray(results){

    let newO=[];
    for(const result of results ){
      let all = ( result.url.split(";"));
        newO.push((Object.assign(result, {url:all})));
    }


    return newO;
}

function getProductArr(results){

    let newO=[];
    for(const result of results ){
        // newO.push( result.gallaryImg.split(";"))
        let img = result.gallaryImg.split(";");
        let subCategory = result.subCategoryName.split(";")
        newO.push((Object.assign(result, {gallaryImg:img, subCategoryName:subCategory})));
    }

    return newO;
}


function getCategoryArr (results){
    let newO = [];

    for(const result of results ){
        // newO.push( result.gallaryImg.split(";"))
        let img = result.galleryImg.split(";");
        let subCategory = result.subCategoryName.split(";");
        newO.push((Object.assign(result, {galleryImg:img, subCategoryName: subCategory})));
    }

   return newO;
}



module.exports = {getArray, getProductArr, getCategoryArr};