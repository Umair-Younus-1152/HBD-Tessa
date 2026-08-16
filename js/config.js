/* ============================================================
   SITE CONFIG
   ------------------------------------------------------------
   This is the ONLY file you should need to touch to personalize
   the site for someone new. Everything else (layout, CSS,
   animation logic) reads from the values below.

   - Change `name` to update the balloons, headline, and closing line.
   - Edit `message` to change the scrolling birthday poem — add,
     remove, or reorder lines freely, the layout adapts.
   - Edit `colors` to re-theme the whole site (used as CSS variables).
   ============================================================ */

const SITE_CONFIG = {

  // The name of the person the site is for.
  name: "TESA",

  // Color palette. Every value here becomes a CSS variable
  // (e.g. colors.rose -> var(--rose)), so changing a hex code
  // here re-themes the entire site consistently.
  colors: {
    cream:     "#FFF6EC",
    peach:     "#F6C9A0",
    rose:      "#E28B93",
    roseDeep:  "#B85566",
    gold:      "#CB9A46",
    sage:      "#93A97C",
    ink:       "#4A3B34"
  },

  // The poem revealed line-by-line in the final "story" scene.
  // A closing line with the name is added automatically — no
  // need to repeat the name at the end.
  message: [
    "Today is...",
    "as beautiful as other days",
    "but you realize",
    "another year has gone",
    "in a blink of the eyes",
    "however",
    "do you know?",
    "today is just special",
    "so special to you",
    "that's why",
    "let's make it...",
    "the best celebration ever",
    "and let me share...",
    "a piece of happiness with you",
    "I made all this...",
    "as a birthday present for you",
    "thanks for the friendship we've made",
    "thanks for everything",
    "I wish you all the best",
    "may your life be at ease",
    "may all your wishes come true",
    "remember...",
    "your ambitions",
    "you live as a free bird",
    "flying in the blue sky",
    "now things are different",
    "the real story of your life",
    "is just about to begin",
    "indeed...",
    "but don't worry",
    "because...",
    "God has your back",
    "and this year will be better",
    "and I hope",
    "you'll find...",
    "happiness along the way",
    "keep your spirit up",
    "enjoy every single moment",
    "that you experience today",
    "fill it with your most beautiful smile",
    "and make it the best memory",
    "lastly...",
    "I'd like to wish you one more time"
  ],

  // Background music. Point this at a different file to change the song.
  music: "assets/hbd.mp3"
};
