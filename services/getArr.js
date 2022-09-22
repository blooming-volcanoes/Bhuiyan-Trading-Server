


function getArray(results){

    let newO=[];
    for(const result of results ){
      let all = ( result.url.split(";"));
        newO.push((Object.assign(result, {url:all})));
    }


    return newO;
}

function getImgGallaryArr(results){

    let newO=[];
    for(const result of results ){
        // newO.push( result.gallaryImg.split(";"))
        let img = result.gallaryImg.split(";");
        newO.push((Object.assign(result, {gallaryImg:img})));
    }

    return newO;
}



module.exports = {getArray, getImgGallaryArr};