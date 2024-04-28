import * as React from 'react';
import "./feed_item.css";


const BookmarkDeco = () => (
  <div className="absolute right-2 top-8 flex w-fit h-fit flex-row">
    <div className="relative z-30 h-8 w-24 bg-theme-color-1 bookmark-deco"></div>
    <div className="relative flex mx-4 z-30 h-8 w-fit bg-theme-color-1 items-center bookmark-timestamp">
      <p className="relative text-center px-4">2024-03-26</p>
    </div>
  </div>
);

const AvatarAndName = ({ blog }) => (
  <div className="flex flex-col items-center justify-center w-36 h-fit mt-4">
    <div className="flex relative w-16 h-16 opacity-70 border-white border-4 rounded-full bg-theme-color-1">{/* TODO */}</div>
    <div className='w-p6 h-auto line-clamp-2 items-center justify-center mt-2 text-wrap w-32 inline-block truncate'>
      <h6 className="text-center blog-author-name">{blog.author}</h6>
    </div>
  </div>
);



const FeedItem = ({ blog }) => {
  return (
    <div className="flex relative w-fit h-fit pr-48 min-w-24">
      <AvatarAndName blog={blog} />
      <BookmarkDeco />
      <div className="relative blog-div-bg select-text h-fit flex flex-col mb-12 px-24 py-3 justify-center items-center rounded-sm ml-8">
        <div className="w-[560px] h-fit">
          {blog.title && <h3 className='z-0 h-auto pb-6 text-lg text-start opacity-95 text-gumi-orange blog-title text-animation'>{blog.title}</h3>}
          {blog.content.split("\n").map((line, _) => {
            return (
              <div className="flex" style={{ minWidth: "42px" }}>
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