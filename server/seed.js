const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/config");
const users = require("./db/models/users");
const { polls, options } = require("./db/models/polls");
const comments = require("./db/models/comments");

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Create some users if none exist
    const userCount = 10;
    let seedUsers = await users.find({});

    if (seedUsers.length < userCount) {
      console.log("Creating seed users...");
      const newUsers = [];
      for (let i = 0; i < userCount; i++) {
        newUsers.push({
          email: `user${i + seedUsers.length}@vibe.com`,
          password: "password123",
          username: `Viber_${i + seedUsers.length}`,
          avatar: Math.floor(Math.random() * 20),
          pollsCreated: [],
          pollsVoted: [],
          followers: [],
          following: [],
          savedPolls: []
        });
      }
      const insertedUsers = await users.insertMany(newUsers);
      seedUsers = [...seedUsers, ...insertedUsers];
      console.log(`Created ${newUsers.length} new seed users.`);
    }

    // Poll questions for varied content
    const pollQuestions = [
      "Which superpower would you choose?",
      "Best programming language in 2024?",
      "Coffee or Tea?",
      "Dark mode or Light mode?",
      "Tabs or Spaces?",
      "iOS or Android?",
      "Is pineapple on pizza acceptable?",
      "Best season of the year?",
      "Mountains or Beach?",
      "Working from home or Office?",
      "Marvel or DC?",
      "React or Vue?",
      "Fast food or Home cooked?",
      "Physical books or E-books?",
      "Cats or Dogs?",
      "Space exploration or Deep sea exploration?",
      "Time travel to past or future?",
      "Elon Musk: Genius or Madman?",
      "AI will take over the world?",
      "Best movie franchise?",
      "Early bird or Night owl?",
      "Summer or Winter?",
      "Netflix or YouTube?",
      "Spotify or Apple Music?",
      "PC or Console gaming?",
      "Pizza or Burger?",
      "Chocolate or Vanilla?",
      "Batman or Superman?",
      "Star Wars or Star Trek?",
      "Lord of the Rings or Harry Potter?",
      "Tesla or Porsche?",
      "What is the best way to travel?",
      "Favorite type of music?",
      "Breakfast or Dinner?",
      "City life or Country life?"
    ];

    const now = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    console.log("Seeding polls...");
    const pollCount = 50;
    for (let i = 0; i < pollCount; i++) {
      const creator = seedUsers[Math.floor(Math.random() * seedUsers.length)];
      
      // Random date between one year ago and now
      const randomDate = new Date(oneYearAgo.getTime() + Math.random() * (now.getTime() - oneYearAgo.getTime()));
      
      const optionTexts = [
        ["Flight", "Invisibility", "Telepathy", "Strength"],
        ["JavaScript", "Python", "Rust", "Go"],
        ["Coffee", "Tea", "Matcha", "Hot Chocolate"],
        ["Dark", "Light", "System Default"],
        ["Tabs", "Spaces"],
        ["iOS", "Android"],
        ["Yes, it's great", "No, it's a crime"],
        ["Spring", "Summer", "Autumn", "Winter"],
        ["Mountains", "Beach", "Countryside"],
        ["WFH", "Office", "Hybrid"],
        ["Marvel", "DC"],
        ["React", "Vue", "Angular", "Svelte"],
        ["Fast Food", "Home Cooked"],
        ["Physical", "E-books", "Audiobooks"],
        ["Cats", "Dogs", "Both", "Neither"],
        ["Space", "Ocean"],
        ["Past", "Future"],
        ["Genius", "Madman", "Both", "Neither"],
        ["Definitely", "Probably not", "Impossible"],
        ["Star Wars", "MCU", "Harry Potter", "LOTR"],
        ["Early Bird", "Night Owl"],
        ["Summer", "Winter"],
        ["Netflix", "YouTube", "Hulu", "Disney+"],
        ["Spotify", "Apple Music", "Tidal"],
        ["PC", "PlayStation", "Xbox", "Switch"],
        ["Pizza", "Burger", "Tacos"],
        ["Chocolate", "Vanilla", "Strawberry"],
        ["Batman", "Superman"],
        ["Star Wars", "Star Trek"],
        ["LOTR", "Harry Potter"],
        ["Tesla", "Porsche", "Lucid", "Rivian"],
        ["Plane", "Train", "Car", "Ship"],
        ["Rock", "Pop", "Hip Hop", "Jazz", "Classical"],
        ["Breakfast", "Dinner"],
        ["City", "Country"]
      ];

      const currentOptions = optionTexts[i % optionTexts.length];
      
      const createdOptions = await options.insertMany(
        currentOptions.map(text => ({ text, voters: [] }))
      );

      const poll = new polls({
        question: pollQuestions[i % pollQuestions.length],
        creator: creator._id,
        options: createdOptions.map(o => o._id),
        date: randomDate
      });

      await poll.save();
      
      // Update creator's pollsCreated list
      await users.findByIdAndUpdate(creator._id, { $push: { pollsCreated: poll._id } });

      // Add random votes
      const voterCount = Math.floor(Math.random() * (seedUsers.length / 2)) + 1;
      const shuffledUsers = [...seedUsers].sort(() => 0.5 - Math.random());
      
      for (let j = 0; j < voterCount; j++) {
        const voter = shuffledUsers[j];
        const randomOption = createdOptions[Math.floor(Math.random() * createdOptions.length)];
        
        await options.findByIdAndUpdate(randomOption._id, { $addToSet: { voters: voter._id } });
        await users.findByIdAndUpdate(voter._id, { $addToSet: { pollsVoted: poll._id } });
      }

      // Add random comments
      const commentCount = Math.floor(Math.random() * 8);
      for (let k = 0; k < commentCount; k++) {
        const commenter = seedUsers[Math.floor(Math.random() * seedUsers.length)];
        // Comment date should be after poll date
        const commentDate = new Date(randomDate.getTime() + Math.random() * (now.getTime() - randomDate.getTime()));
        
        const comment = new comments({
          pollId: poll._id,
          userId: commenter._id,
          text: [
            "Great poll!", "I totally agree.", "Interesting choices.", 
            "Hard to decide!", "I've been thinking about this too.",
            "Definitely Option A.", "Why would anyone pick B?", 
            "Voted!", "Nice one.", "Looking forward to the results."
          ][Math.floor(Math.random() * 10)],
          date: commentDate
        });
        await comment.save();
      }
    }

    console.log(`Successfully seeded ${pollCount} polls with votes and comments.`);
    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
