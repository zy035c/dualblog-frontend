import React, { Component } from "react";
import PrimeList from "./prime_list";

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

const HomePage = () => {
  return (
    <div>
      <div className="m-12 mx-12">
        <p1 className="text-white text-4xl font-serif">伟大领袖，伟大导师，伟大舵手最新指示：<br></br>把世界管起来！</p1>
      </div>

      <div className="text-md text-white bg-gradient-to-br from-pigliver-400 via-pigliver-700 to-pigliver-800 w-96 rounded-2xl border-pigliver-600 border-[1px] overflow-hidden card-shadow mx-12 my-6">
        <div className="text-2xl bg-pigliver-200 text-pigliver-500 p-4 sticky font-thin">
          《原始人，联合起来！》
        </div>
        <div className="p-6 pb-8 font-thin opacity-85">
          你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。
        </div>
      </div>
    </div>
  );
};

export { HomePage };
