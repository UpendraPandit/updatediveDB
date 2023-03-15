const dbConnection = require('./pilot');

const update= async()=>{
    let data = await  dbConnection();
    let updates= await data.deleteOne(
        {name:'Ayushi'}
    );
    console.warn(updates);
}
update();