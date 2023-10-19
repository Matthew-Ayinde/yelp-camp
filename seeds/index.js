const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

// 'mongodb://localhost:27017/yelp-camp'
// 'mongodb+srv://matthew:matthew03@cluster0.w3sshbp.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect('mongodb+srv://matthew:matthew03@cluster0.w3sshbp.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63fcf2d9ff526828b83785a2',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: { type: 'Point',
             coordinates: [ cities[random1000].longitude,
             cities[random1000].latitude 
            ]
          },
            images: [
                {
                  url: 'https://res.cloudinary.com/duvwlkwhp/image/upload/v1697640708/YelpCamp/scott-goodwill-y8Ngwq34_Ak-unsplash_h9qxmk.jpg',
                  filename: 'YelpCamp/scott-goodwill-y8Ngwq34_Ak-unsplash_h9qxmk'
                },
                {
                  url: 'https://res.cloudinary.com/duvwlkwhp/image/upload/v1697671896/YelpCamp/camp3_s0gwct.jpg',
                  filename: 'YelpCamp/camp3_s0gwct'
                },
                {
                  url: 'https://res.cloudinary.com/duvwlkwhp/image/upload/v1697671526/YelpCamp/tommy-lisbin-2DH-qMX6M4E-unsplash_n9nc1l.jpg',
                  filename: 'YelpCamp/tommy-lisbin-2DH-qMX6M4E-unsplash_n9nc1l'
                }
                // {
                //   url: 'https://res.cloudinary.com/duvwlkwhp/image/upload/v1697640708/YelpCamp/scott-goodwill-y8Ngwq34_Ak-unsplash_h9qxmk.jpg',
                //   filename: 'YelpCamp/ueoiw9v0ipi5bmq9f71w'
                // },
                // {
                //   url: 'https://res.cloudinary.com/duvwlkwhp/image/upload/v1678856197/YelpCamp/rjwyvfuckqs2q4wzv3fw.jpg',
                //   filename: 'YelpCamp/rjwyvfuckqs2q4wzv3fw'
                // }
              ],

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})