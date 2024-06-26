import React, { Component, useEffect, useState } from "react";
import PrimeList from "./prime_list";
import "./home.css";
import { Button } from "src/components/ui/button";

import { first_sentence } from "src/texts/index_text";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { motion, useCycle } from "framer-motion";
import { Card } from "src/components/ui/card";

import { useAnimationControls } from "framer-motion";

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

const TechCard = ({ url, name }) => {
  const controls = useAnimationControls();

  const [isHovering, setHovering] = useCycle(false, true);

  const fadeIn = async () => {
    setHovering();

    controls.stop();
    await controls.start(
      {
        x: -2000,
      },
      {
        duration: 0,
      }
    );
    await controls.start(
      {
        x: 0,
      },
      {
        duration: 0.55,
        ease: [0.17, 0.81, 0.41, 0.92],
      }
    );
  };

  const fadeOut = async () => {
    setHovering();

    controls.stop();
    await controls.start(
      {
        x: "100vw",
      },
      {
        duration: 0.55,
        ease: [0.17, 0.81, 0.41, 0.92],
      }
    );

    await controls.start(
      {
        x: -2000,
      },
      {
        duration: 0,
      }
    );
  };

  return (
    <div
      className="w-screen h-fit flex relative"
      onMouseEnter={() => fadeIn()}
      onMouseLeave={() => fadeOut()}
    >
      <Card className="rounded-none h-36 relative overflow-hidden w-screen bg-white">
          {/* Overlay */}
          <motion.div
          className="absolute inset-0 h-full w-[100vw] bg-theme-color-1 opacity-25"
          initial={{ x: "-100vw" }}
          animate={controls}
        />
        <div className="flex flex-row justify-start h-auto px-8">
          <motion.div
            className="w-fit h-fit opacity-100 flex items-center justify-center"
            variants={{
              unhover: {
                scale: 0.95,
                z: 1,
                transition: {
                  ease: "easeOut",
                  duration: 0.2,
                },
              },
              hover: {
                scale: 1,
                z: 1,
                transition: {
                  ease: "easeOut",
                  duration: 0.2,
                },
              },
            }}
            animate={isHovering ? "hover" : "unhover"}
          >
            <img
              src={url}
              className="max-h-36 w-[260px] object-contain ml-2 h-auto"
              alt={name}
            />
           
          </motion.div>
          <h1 className="flex md:text-4xl sm:text-3xl pt-12 ml-64 z-20 pointer-events-none">
            {name}
          </h1>
        </div>
      
      </Card>
    </div>
  );
};

const BannerTech = () => (
  <motion.div
    className="flex px-12 banner-tech text-xl text-nowrap text-white opacity-100"
    initial={{ x: "0%" }}
    animate={{ x: "100%" }}
    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
  >
    a utyuu & liveevil work
  </motion.div>
);

const PoweredBy = () => {
  const stacks = [
    {
      name: "GITHUB",
      url: "Github.png",
    },
    {
      name: "SPRING BOOT 3.0",
      url: "JavaTransparent.png",
    },
    {
      name: "REACT.JS",
      url: "React.png",
    },
    {
      name: "TAILWIND CSS",
      url: "Tailwindcss6.png",
    },
    {
      name: "LINUX UBUNTU",
      url: "Ubuntu.png",
    },
  ];

  return (
    <>
      <p className="flex md:text-[42px] sm:text-2xl pt-12 text-white sub-title pl-12">
        技术栈
      </p>
      <h6 className="pb-12 pl-12 pt-4 text-theme-color-1">フレームワーク</h6>
      <div className="bg-gray-300 opacity-95 w-full h-10 flex flex-row items-center justify-center overflow-hidden">
        <BannerTech />
        <BannerTech />
        <BannerTech />
        <BannerTech />
        <BannerTech />
        <BannerTech />
        <BannerTech />
        <BannerTech />
      </div>
      {stacks.map((tech, idx) => {
        let myurl = "/index/powered_by/" + tech.url;
        return <TechCard name={tech.name} url={myurl} />;
      })}
    </>
  );
};

const FreatuedBlogs = () => {
  return (
    <>
      <p className="flex md:text-[42px] sm:text-2xl pt-12 text-white sub-title pb-12 pl-12">
        今日推荐
      </p>
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
    <div>
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
      <div className="absolute top-0 left-0 h-[60vh] w-full bg-black opacity-10 z-0" />
      <div className="absolute top-0 left-0 h-[60vh] w-full opacity-60 vignette z-0" />
      <div className="absolute md:top-[49vh] sm:top-[51vh] left-0 h-auto w-full">
        <p className="px-8 text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl opacity-90 text-nowrap first-sentence">
          {first_sentence()}
        </p>
      </div>
    </div>
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

const AboutUs = () => (
  <div>
    <div className="flex flex-col items-center w-screen p-16 relative">
      <h1 className="flex md:text-5xl sm:text-3xl pt-12 text-white">
        YES, INDEED...
      </h1>
      <h6 className="about-question mb-12 mt-1 text-theme-color-1">
        「Dual Blog」是？
      </h6>
      <h5 className="flex md:text-xl sm:text-lg pb-6 text-white">
        「Dual Blog」是由两个软件工程师维护的独立博客平台、
      </h5>
      <h3 className="flex md:text-3xl sm:text-xl pb-16 text-white">
        从技术侧的视角，追求更好的阅读和书写体验。
      </h3>
      <Button
        variant="outline"
        className="rounded-3xl h-12 w-48 text-md"
        style={{ "font-family": "Noto Serif SC" }}
      >
        了解我们
        <OpenInNewWindowIcon />
      </Button>
      <div className="absolute inset-0 h-fit inset-y-64 z-[-1] overflow-hidden">
        <Banner />
      </div>
    </div>
  </div>
);

const BannerCodeDualBlog = () => (
  <motion.div
    className="flex px-12 banner-code-dualblog text-7xl text-nowrap text-gray-300 opacity-80"
    initial={{ x: "0%" }}
    animate={{ x: "100%" }}
    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
  >
    コード デュアルブログ
  </motion.div>
);

const Banner = () => {
  return (
    <>
      <div className="w-full h-24 justify-center">
        <div className="flex flex-row-reverse gap-4 h-full w-full">
          <BannerCodeDualBlog />
          <BannerCodeDualBlog />
          <BannerCodeDualBlog />
          <BannerCodeDualBlog />
        </div>
      </div>
    </>
  );
};

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col">
        <ImageGallery images={images} />
        <AboutUs />
        <PoweredBy />
        <FreatuedBlogs />
      </div>
    </>
  );
};

export { HomePage };
