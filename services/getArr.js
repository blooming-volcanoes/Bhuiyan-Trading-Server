


function getArray(results){

    let newO=[];
    for(const result of results ){
        newO.push( result.url.split(";"))
    }

    let getAll = newO.flatMap(res=>res);

    return getAll;
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