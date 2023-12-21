function getDateNow(date){
    let dateNow = date.getDate();
    let MonthNow = date.getMonth() + 1;
    let YearNow = date.getFullYear();

    const dates = new Date(YearNow, MonthNow, dateNow);

    return dates;
}

module.exports = getDateNow;
