export const first_sentence = () => {
    const descriptions = [
      "对夜空唱什么样的歌，才能把破碎的心重新缝合。",
      "我们直到宇宙的尽头，也手牵着手。",
      "檀木一般的黑发，入睡的春天就在这里。",
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };