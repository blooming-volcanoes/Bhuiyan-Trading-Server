function pagination(page, numPerPage ){
    page =  page || 0;
    var skip = (page - 1) * numPerPage;
    var limit = skip + ',' + numPerPage;

    return {limit:limit, skip:skip}
}



module.exports = pagination;