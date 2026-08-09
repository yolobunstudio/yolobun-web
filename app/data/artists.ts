export type Artist = {
  name: string;
  role: string;
  tags: string[];
  bio: string;
  expandedBio: string;
  links: {
    platform: string;
    title: string;
    description: string;
    url: string;
    preview?: boolean;
  }[];
  image: boolean;
};

export const artists: Artist[] = [
  {
    name: "yolobun",
    role: "founder sorta / producer",
    tags: ["dubstep", "bass house", "trap", "melodic", "hardstyle"],
    bio: "let's have some fun lolol",
    expandedBio:
      "yolobun is the main project: loud drops, weird left turns, unserious energy, and songs built to make the room feel less normal. This is the place for releases, sets, clips, and whatever else gets thrown into the machine.",
    links: [
      {
        platform: "SoundCloud",
        title: "full sets on soundcloud",
        description: "soundcloud.com/yolobunmusic",
        url: "https://soundcloud.com/yolobunmusic",
        preview: true,
      },
      {
        platform: "SoundCloud",
        title: "individual mixes + edit packs",
        description: "soundcloud.com/defineyolo",
        url: "https://soundcloud.com/defineyolo",
      },
      {
        platform: "YouTube",
        title: "youtube",
        description: "youtube.com/@yolobun",
        url: "https://www.youtube.com/@yolobun",
        preview: true,
      },
      {
        platform: "Instagram",
        title: "instagram",
        description: "instagram.com/yolobunmusic",
        url: "https://www.instagram.com/yolobunmusic/",
        preview: true,
      },
      {
        platform: "TikTok",
        title: "yolobun tiktok",
        description: "tiktok.com/@yolobun",
        url: "https://www.tiktok.com/@yolobun",
        preview: true,
      },
      {
        platform: "TikTok",
        title: "henwoo tiktok",
        description: "tiktok.com/@henwoo",
        url: "https://www.tiktok.com/@henwoo",
      },
    ],
    image: true,
  },
  {
    name: "nian",
    role: "artist / producer",
    tags: ["indie pop", "bedroom pop", "alt r&b"],
    bio: "maybe your next lowkey niche artist",
    expandedBio:
      "nian sits in the softer corner of the roster: intimate pop writing, warm production, and lowkey songs that sneak up on you. Start here for music, socials, and the newest places the project is showing up.",
    links: [
      {
        platform: "SoundCloud",
        title: "soundcloud",
        description: "soundcloud.com/nian_la",
        url: "https://soundcloud.com/nian_la",
        preview: true,
      },
      {
        platform: "Spotify",
        title: "spotify",
        description: "open.spotify.com/artist/nian",
        url: "https://open.spotify.com/artist/3cBfn66CziFcst8xoHF9ZC",
        preview: true,
      },
      {
        platform: "Instagram",
        title: "instagram",
        description: "instagram.com/nian.la",
        url: "https://www.instagram.com/nian.la/",
        preview: true,
      },
      {
        platform: "TikTok",
        title: "tiktok",
        description: "tiktok.com/@itsnotgordon",
        url: "https://www.tiktok.com/@itsnotgordon",
        preview: true,
      },
    ],
    image: true,
  },
  {
    name: "artist 03",
    role: "artist",
    tags: [],
    bio: "coming soon",
    expandedBio: "More soon.",
    links: [],
    image: false,
  },
];
