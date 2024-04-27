export const empty_blog_warning = () => {
  const descriptions = [
    "凡所有相，皆是虚妄。若见诸相非相，即见如来。",
    "魔理沙偷走了重要的东西",
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

export const post_blog_text = (isSuccess) => {
  const ok_descriptions = [
    "但是，古尔丹，代价是什么呢？",
    "「正义的伙伴」",
  ];

  const fail_descriptions = ["你看上去脸色不太好～"];

  if (isSuccess) {
    return ok_descriptions[Math.floor(Math.random() * ok_descriptions.length)];
  } else {
    return fail_descriptions[
      Math.floor(Math.random() * fail_descriptions.length)
    ];
  }
}