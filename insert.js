const dbConnection = require('./pilot.js');

const insert = async () => {
    const db = await dbConnection();
    const result = await db.insertMany([
        {
            name: 'Ayushman Joshi',
            phone: 9119031656,
            email: 'ayushman1208@gmail.com',
            gender: 'female',
            currLoc: '12.2334,12.3444'
        },
        {
            name: 'Ayushi',
            phone: 8585031685,
            email: 'ayushman1208@gmail.com',
            gender: 'female',
            currLoc: '12.2334,12.3444'
        },
        {
            name: 'Joshi',
            phone: 9510031685,
            email: 'ayushman1208@gmail.com',
            gender: 'female',
            currLoc: '12.2334,12.3444'
        },
    ]);
    if (result.acknowledged) {
        console.log('goya');
    };
}
insert();