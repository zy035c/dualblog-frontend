
import * as React from 'react';
import FeedItem from './feed_item';

export function Feed({ blogs }) {

    return (
        <div id="indexPage2" className="relative flex flex-col h-screen w-screen min-w-[1350px] pt-36">
            {blogs.map((blog, _) => {
                return (
                    <FeedItem blog={blog} />
                );
            })}

            <h6 className="text-gumi-white pb-8">你已经来到了世界的尽头... [ Loaded {blogs.length} blogs ]</h6>
        </div>
    );
}