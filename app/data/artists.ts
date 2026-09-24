import type { StaticImageData } from "next/image";
import nianPortrait from "../media/nian.jpg";
import yolobunPortrait from "../media/yolobun.jpg";

export type Artist = {
  name: string;
  role: string;
  tags: string[];
  bio: string;
  links: { label: string; url: string }[];
  image?: {
    src: StaticImageData;
    position: string;
  };
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
      { label: "Instagram", url: "https://www.instagram.com/yolobunmusic/" },
      { label: "TikTok", url: "https://www.tiktok.com/@yolobun" },
    ],
    image: { src: yolobunPortrait, position: "center center" },
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
    image: { src: nianPortrait, position: "center top" },
  },
  {
    name: "artist 03",
    role: "artist",
    tags: [],
    bio: "coming soon",
    links: [],
  },
];
