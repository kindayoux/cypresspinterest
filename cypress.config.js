const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      username: "sdbtqa@gmail.com",
      password: "TQASDB123",
      boardName: 'Photographer Tips',
      title: "BEST 10 TIPS FOR AUTHENTIC INSTAGRAM PHOTOS OF YOUR TRAVELS",
      description:
        "Instagram is the perfect way to share your travel adventures with your tribe around the world. It’s one of my favorite things to do. Scrolling through my feed I’m like ‘oh look she’s there and he’s here. Wow, it looks great. I wanna go there as well.’ The sharing part is not the most difficult aspect of Instagram.",
      filePin: "TipsPhoto.jpg",
      linkPin:
        "https://medium.com/@sdbtqa/best-10-tips-for-authentic-instagram-photos-of-your-travels-67242916aa5d",
      shortLinkPin: "medium.com",
    },
  },
});
