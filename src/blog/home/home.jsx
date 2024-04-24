import React, { Component } from "react";
import PrimeList from "./prime_list";
import { HeaderMenu } from "./header_memu";
import "./home.css";

import { first_sentence } from "src/texts/index_text";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home</h2>

        <PrimeList />
      </div>
    );
  }
}

const PoweredBy = () => {
  return (
    <>
      {/* <div className="text-sm text-white bg-gradient-to-br from-pigliver-400 via-pigliver-700 to-pigliver-800 w-96 rounded-2xl border-pigliver-600 border-[1px] overflow-hidden card-shadow mx-12 my-6">
        你好
      </div>
      <img className="" src="/index/powered_by/Github.png" alt="github"></img> */}
    </>
  );
};

const images = [
  { url: "/index/the_four/flower1.jpg" },
  { url: "/index/the_four/tokyo.jpg" },
  { url: "/index/the_four/tele.jpg" },
  { url: "/index/the_four/flower2.jpg" },
];

const ImageGallery = ({ images }) => {
  return (
    <>
      <div className="flex flex-row overflow-hidden h-[60vh] z-[-10]">
        {images.map((image, index) => (
          <div key={index} className="flex w-1/4 h-full">
            <img
              src={image.url}
              alt="w"
              className="flex w-auto h-[40rem] object-cover"
            />
          </div>
        ))}
      </div>
      <div className="fixed top-0 left-0 h-[60vh] w-full bg-black opacity-15" />
      <div className="fixed top-0 left-0 h-[60vh] w-full opacity-60 vignette" />
      <div className="fixed top-[49vh] left-0 h-auto w-full">
        <p className="px-8 text-white text-5xl opacity-90">{first_sentence()}</p>
      </div>
    </>
  );
};

const YouAreRightButGenshin = (props) => (
  <div className="text-md text-white bg-gradient-to-br from-pigliver-400 via-pigliver-700 to-pigliver-800 w-96 rounded-2xl border-pigliver-600 border-[1px] overflow-hidden card-shadow mx-12 my-6">
    <div className="text-2xl bg-pigliver-200 text-pigliver-500 p-4 sticky font-thin">
      《原始人，联合起来！》
    </div>
    <div className="p-6 pb-8 font-thin opacity-85">
      你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。
    </div>
  </div>
);

const HomePage = () => {
  return (
    <>
      <ImageGallery images={images} />
    </>
  );
};

export { HomePage };
