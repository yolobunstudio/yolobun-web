export type Artist = {
  name: string;
  role: string;
  tags: string[];
  bio: string;
  links: { label: string; url: string }[];
  image: boolean;
};

export const artists: Artist[] = [
  {
    name: "yolobun",
    role: "founder sorta / producer",
    tags: ["dubstep", "bass house", "trap"],
    bio: "let's have some fun lolol",
    links: [
      { label: "SoundCloud", url: "https://soundcloud.com/yolobunmusic" },
      { label: "YouTube", url: "https://www.youtube.com/@yolobun" },
      { label: "TikTok", url: "https://www.tiktok.com/@yolobun" },
      { label: "TikTok", url: "https://www.tiktok.com/@henwoo" },
    ],
    image: true,
  },
  {
    name: "nian",
    role: "artist / producer",
    tags: ["indie pop", "bedroom pop", "alt r&b"],
    bio: "maybe your next lowkey niche artist",
    links: [
      { label: "SoundCloud", url: "https://soundcloud.com/nian_la" },
      { label: "Spotify", url: "https://open.spotify.com/artist/3cBfn66CziFcst8xoHF9ZC" },
      { label: "Instagram", url: "https://www.instagram.com/nian.la/" },
      { label: "TikTok", url: "https://www.tiktok.com/@itsnotgordon" },
    ],
    image: true,
  },
  {
    name: "artist 03",
    role: "artist",
    tags: [],
    bio: "coming soon",
    links: [],
    image: false,
  },
];
