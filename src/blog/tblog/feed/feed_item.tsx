import * as React from 'react';
import "./feed_item.css";


const BookmarkDeco = () => (
  <div className="absolute right-2 top-48 flex w-fit h-fit flex-row">
    <div className="relative z-30 h-8 w-24 bg-orange-500 bookmark-deco"></div>
    <div className="relative flex mx-4 z-30 h-8 w-fit bg-orange-500 items-center bookmark-timestamp">
      <p className="relative text-center px-4">2024-03-26</p>
    </div>
  </div>
);


const FeedItem = ({ textContent }) => {
  return (
    <div className="flex relative w-fit h-fit pr-48">
      <BookmarkDeco />
      <div className="relative blog-div-bg select-text h-fit flex flex-col mb-12 px-7 py-3 justify-center items-center">
        <div className="w-[560px] h-fit">
          {textContent.split("\n").map((line, _) => {
            return (
              <div className={`flex mx-1 my-1`} style={{ minWidth: "42px" }}>
                <p className="flex select-text text-animation featured-blog-text flex-grow">
                  {line}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeedItem;