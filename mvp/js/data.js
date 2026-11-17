// Mock content for the clickable MVP.
// When the Shopify store is connected, PRODUCTS comes from Shopify instead.
const IMG = "assets/img/";

export const MASCOTS = {
  dondon: {
    id: "dondon",
    name: "DonDon",
    pronouns: "he / him / his",
    color: "yellow",
    traits: ["determined", "competitive", "energetic"],
    blurb:
      "DonDon plays every point like it's match point. He dives, he sweats, he bonks himself with the ball, and he gets right back up with a thumbs up.",
    hero: IMG + "dondon-front.png",
    sticker: IMG + "sticker-dondon.png",
    // tap cycle on the hero stage
    cycle: [
      { img: "dondon-front.png", line: "Let's GOOO!" },
      { img: "dondon-swing.png", line: "Power drive incoming!" },
      { img: "dondon-run.png", line: "I got it! I GOT IT!" },
      { img: "dondon-fallen.png", line: "...I'm good. Totally good." },
    ],
    faces: [
      { img: "dondon-face-fierce.png", mood: "Game face" },
      { img: "dondon-face-dizzy.png", mood: "Too many rallies" },
      { img: "dondon-face-grin.png", mood: "Won the point!" },
      { img: "dondon-face-sweaty.png", mood: "Deuce. Again." },
      { img: "dondon-face-confused.png", mood: "Who hit that?" },
      { img: "dondon-face-sleepy.png", mood: "Post-tournament nap" },
    ],
    poses: [
      { img: "dondon-swing.png", label: "The power drive" },
      { img: "dondon-run.png", label: "Chasing everything" },
      { img: "dondon-fallen.png", label: "Dive, then thumbs up" },
    ],
  },
  dindin: {
    id: "dindin",
    name: "DinDin",
    pronouns: "she / her / hers",
    color: "pink",
    traits: ["smug", "calm", "laid-back"],
    blurb:
      "DinDin doesn't run. She doesn't have to. A soft dink, a sip of her iced drink, and she's already won the rally. Unbothered is a lifestyle.",
    hero: IMG + "dindin-front.png",
    sticker: IMG + "sticker-dindin.png",
    cycle: [
      { img: "dindin-front.png", line: "Oh. You're here." },
      { img: "dindin-swing.png", line: "Dink. Point. Next." },
      { img: "dindin-net.png", line: "Stay out of my kitchen." },
      { img: "dindin-drink.png", line: "Hydration is a strategy." },
    ],
    faces: [
      { img: "dindin-face-smug.png", mood: "Default setting" },
      { img: "dindin-face-grin.png", mood: "Saw that coming" },
      { img: "dindin-face-ooh.png", mood: "Ooh, cute serve" },
      { img: "dindin-face-surprised.png", mood: "Wait, it went in?" },
      { img: "dindin-face-side-eye.png", mood: "Was that a lob?" },
      { img: "dindin-face-bored.png", mood: "Wake me at 10-10" },
    ],
    poses: [
      { img: "dindin-swing.png", label: "Effortless forehand" },
      { img: "dindin-net.png", label: "Kitchen queen" },
      { img: "dindin-drink.png", label: "Break time (always)" },
    ],
  },
};

export const PRODUCTS = [
  { id: "dondon-play-hard-tee", name: "DonDon “Play Hard” Tee", price: 32, mascot: "dondon", bg: "yellow", art: "dondon-swing.png", sizes: ["S", "M", "L", "XL", "XXL"], colors: ["White", "Black"], badge: "New",
    desc: "Heavyweight cotton tee with DonDon mid power-drive. For players who chase every ball, even the ones that are out." },
  { id: "dindin-unbothered-tee", name: "DinDin “Unbothered” Tee", price: 32, mascot: "dindin", bg: "pink", art: "dindin-drink.png", sizes: ["S", "M", "L", "XL", "XXL"], colors: ["White", "Pink"], badge: "New",
    desc: "Soft tee with DinDin sipping through your opponent's comeback. Pairs well with a calm, devastating dink." },
  { id: "dondon-sweatband", name: "DonDon Sweatband", price: 14, mascot: "dondon", bg: "yellow", art: "dondon-face-fierce.png", colors: ["White"],
    desc: "The exact headband DonDon wears. Absorbs sweat. Does not absorb trash talk." },
  { id: "dindin-dad-cap", name: "DinDin Dad Cap", price: 28, mascot: "dindin", bg: "pink", art: "dindin-face-smug.png", colors: ["Pink", "Black", "Cream"],
    desc: "Embroidered DinDin smirk on a relaxed cap. Shades your eyes from the sun and from effort." },
  { id: "kitchen-tote", name: "“Stay Out of My Kitchen” Tote", price: 24, mascot: "dindin", bg: "tan", art: "dindin-net.png", colors: ["Natural"],
    desc: "Canvas tote big enough for two paddles, a ball sleeve, and an iced drink. DinDin approved." },
  { id: "dondon-paddle-cover", name: "DonDon Paddle Cover", price: 22, mascot: "dondon", bg: "yellow", art: "dondon-run.png", colors: ["Yellow"],
    desc: "Padded zip cover that fits standard paddles. Protects your paddle from DonDon-style dives." },
  { id: "dindin-court-socks", name: "DinDin Court Socks", price: 16, mascot: "dindin", bg: "pink", art: "dindin-swing.png", sizes: ["S/M", "L/XL"], colors: ["White"],
    desc: "Cushioned crew socks with a pink bow on the ankle. For gliding to the ball (slowly)." },
  { id: "dinksy-sticker-pack", name: "Dinksy Sticker Pack", price: 8, mascot: "dinksy", bg: "cream", art: "sticker-dondon.png", colors: ["6-pack"], badge: "Fan fave",
    desc: "Six waterproof vinyl stickers of DonDon and DinDin. Slap them on paddles, bottles, and ball hoppers." },
];

export const QUIZ = [
  { q: "Your partner just missed an easy put-away. You…", a: [
    ["Yell “NEXT ONE!” and slap your paddle", "dondon"],
    ["Sip your drink. Say nothing. Raise one eyebrow.", "dindin"] ] },
  { q: "Ball's lobbed over your head. You…", a: [
    ["Sprint. Dive. Thumbs up from the ground.", "dondon"],
    ["Let it go. It's probably out anyway.", "dindin"] ] },
  { q: "Pick your between-games snack:", a: [
    ["Energy gel. Then another energy gel.", "dondon"],
    ["Iced oat latte, extra ice", "dindin"] ] },
];

export const VIDEOS = [
  { title: "DonDon vs. the ball machine", mascot: "dondon", bg: "yellow", art: "dondon-run.png" },
  { title: "DinDin rates your serve", mascot: "dindin", bg: "pink", art: "dindin-face-side-eye.png" },
  { title: "Who dinks first?", mascot: "both", bg: "tan", art: "dindin-net.png" },
];

export const img = (file) => IMG + file;
