const fs = require('fs');

exports.CreateData = (path,db_data,new_data) => {
    if(Boolean(Object.keys(new_data).length && path)){
        db_data.push(new_data)
        fs.writeFileSync( path, JSON.stringify(db_data,null ,2) , 'utf-8')
        return {message : "Data was Add SuccessFully",new_data};
    }else{
        return {message : "Data Was Not Create Try Again for Validate Schema..."}
    }
}

exports.DeleteData = (path,db_data,_id) => {
    const Index = db_data.findIndex(data => data.id === _id)
    const deleteData = db_data[Index]
    if(Index !== -1 && path){
        db_data.splice(Index,1);
        fs.writeFileSync(path,JSON.stringify(db_data,null,2),"utf-8");
        return {message : "Data Was Delete SuccessFully",deleteData}
    }else{
        return {message : "Data Was Not Delete"}
    }
}
exports.ReplacesData = (path,db_data,replace_data,_id) => {
    const Index = db_data.findIndex(data => data.id === _id)
    if(Index !== -1 && path){
        db_data.splice(Index , 1,{id : _id , ...replace_data})
        fs.writeFileSync(path,JSON.stringify(db_data,null,2) , 'utf-8');
        return {message:"Data Replace SuccessFully" , replace_data}
    }else{
        return {message:"Data Not Replace Try Again"}
    }
}

exports.UpdateData =(path,db_data,update_data,_id)=> {
    const Index = db_data.findIndex(data => data.id === _id)
    if(Index !== -1 && path){
        db_data.splice(Index , 1,{...db_data[Index], ...update_data})
        fs.writeFileSync(path,JSON.stringify(db_data, null , 2) , 'utf-8');
        return {message:"Data Update SuccessFully" , update_data}
    }else{
        return {message:"Data Not Update Try Again"}
    }

}