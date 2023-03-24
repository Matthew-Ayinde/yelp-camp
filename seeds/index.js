const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
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
                  url: 'https://res.cloudinary.com/duvwlkwhp/image/upload/v1678856194/YelpCamp/q1u3gfsrt8fohodk1ult.jpg',
                  filename: 'YelpCamp/q1u3gfsrt8fohodk1ult'
                },
                {
                  url: 'https://res.cloudinary.com/duvwlkwhp/image/upload/v1678856196/YelpCamp/ueoiw9v0ipi5bmq9f71w.jpg',
                  filename: 'YelpCamp/ueoiw9v0ipi5bmq9f71w'
                },
                {
                  url: 'https://res.cloudinary.com/duvwlkwhp/image/upload/v1678856197/YelpCamp/rjwyvfuckqs2q4wzv3fw.jpg',
                  filename: 'YelpCamp/rjwyvfuckqs2q4wzv3fw'
                }
              ],

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})