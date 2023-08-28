import moment from "moment";

export const assignmentFilter = (filters, data) => {

    let FilterData = data;

    if (Array.isArray(data) && data.length && filters.length) {
        
        for(let i=0; i< filters.length; i++){

            if(filters[i].filter == 'searchByName'){
               FilterData = FilterData.filter(
                    (item) =>
                    (
                        (item.title).toLowerCase().includes(filters[i]['filterValue'].toLowerCase())
                    )
                );
                
            }
    
            if(filters[i].filter == 'filterByDate'){
                
                FilterData = FilterData.filter(
                    (item) => (
                        moment(item.startDate).format("YYYY-MM-DD") <= filters[i]['filterValue'] && filters[i]['filterValue'] <= moment(item.dueDate).format("YYYY-MM-DD")
                    )
                );
                
            }
    
            if(filters[i].filter == 'filterBystatus'){
               
                if (filters[i].filterValue == "1") {
                    // Done || Completed
                    FilterData = FilterData.filter((item) => item.submissionsCount > 0);
    
                } else if (filters[i].filterValue == "2") {
                    
                    // Current
                    FilterData = FilterData.filter(
                        (item) =>
                        item.submissionsCount == 0 &&
                        (
                            moment(item.startDate).format("YYYY-MM-DD") <= moment(new Date()).format("YYYY-MM-DD") &&
                            moment(new Date()).format("YYYY-MM-DD") <= moment(item.dueDate).format("YYYY-MM-DD")
                        )
                    );
    
                } else if (filters[i].filterValue == "3") {
                    // Upcoming
                    FilterData = FilterData.filter(
                        (item) =>
                        item.submissionsCount == 0 &&
                        (
                            moment(new Date()).format("YYYY-MM-DD") < moment(item.startDate).format("YYYY-MM-DD") &&
                            moment(new Date()).format("YYYY-MM-DD") < moment(item.dueDate).format("YYYY-MM-DD")
                        )
                    );
    
                } else if (filters[i].filterValue == "4") {
                    // Past Due
                    FilterData = FilterData.filter(
                        (item) =>
                        item.submissionsCount == 0 &&
                        (
                            moment(item.startDate).format("YYYY-MM-DD") < moment(new Date()).format("YYYY-MM-DD") && moment(item.dueDate).format("YYYY-MM-DD") <
                            moment(new Date()).format("YYYY-MM-DD")
                        )
                    );
                }
            }
        }
        
    }
    return FilterData;
};