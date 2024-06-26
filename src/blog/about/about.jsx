import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Input } from "src/utils/range_input.jsx";

import "./about.css";

const MotionCtrl = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);

  return (
    <div className="example">
      <div className="">
        <motion.div
          className="box pointer-events-none"
          animate={{ x, y, rotate }}
          transition={{ type: "spring" }}
        />
      </div>
      <div className="inputs">
        <Input value={x} set={setX}>
          x
        </Input>
        <Input value={y} set={setY}>
          y
        </Input>
        <Input value={rotate} set={setRotate} min={-180} max={180}>
          rotate
        </Input>
      </div>
    </div>
  );
};

const TransformBoxExample = () => {
  const y = useMotionValue(0);
  const opacity = useTransform(y, [-100, 0, 100], [0, 1, 0]);

  return (
    <motion.div
      className="box"
      drag="y"
      style={{ y, opacity }}
    />
  );
};

const About = () => {
  return (
    <div>
      <p className="text-white p-4">
        哥，别在网络上追鲨我了，我好害怕，我大脑直接空白了，网线电源全拔了，我现实里没有背景，没有实力，今天真的是踢到铁板了，谁能想到，百度贴吧居然隐藏着一位互联网阎王，事已至此，你杀鸡儆猴，我毫无怨言，要打要鲨随您的便，如果有来世，互联网这潭浑水，我不踏也罢
        <br></br>
        我不明白啊……我不明白！反二雅士骗哥们可以，别把你自己也骗到了就行。哥们被你骗了真无所谓的，打个哈哈就过了。但希望你打完这段话后擦一下眼角，别让眼泪掉在手机屏幕上了就行。你说的这些话，哥们信一下也是没什么的。还能让你有个心里安慰，但这种话说出来骗骗兄弟就差不多得了，哥们信你一下也不会少块肉，但是你别搞得自己也当真了就行。哥们被你骗一下是真无所谓的，兄弟笑笑也就过去了。真不是哥们想要破你防，你擦擦眼泪好好想想，除了兄弟谁还会信你这些话？你知道她不会跟你有任何的交集，她可能会和除了你以外的任何一个人交朋友，而且还可能会展现除了你所知道的关于她的一切以外的东西，她会笑，会哭，也会悲伤，拥有平常但快乐的生活。但你，除了见过她的样子，什么都看不到。她以后或许还会从她的朋友中挑选一位如意郎君，她会在他面前肆意的绽放自己的每一面，她会在他面前踮起脚来亲吻他的嘴唇，会埋进他宽阔的胸膛任性地撒娇，会鼓起脸颊假装生气。但你，除了见过她一面，什么都感受不到。感受不到拥抱她的时候的温度和扑入胸腔的迷人的发香，感受不到每一次缠绵之后她在耳边的温柔呢喃，也感受不到和她白头偕老，儿孙满堂的乐趣。你只见过她一面，但已经知道后来发生的事，只是没你的份。
      </p>

      <div className="flex px-24 py-12">
        <MotionCtrl />
        <motion.div
          className="box"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.1 }}
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
        />
        <TransformBoxExample />
      </div>
    </div>
  );
};

export { About };
