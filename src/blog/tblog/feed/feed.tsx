
import * as React from 'react';
import FeedItem from './feed_item';

export function Feed({ blogs }) {

    return (
        <div id="indexPage2" className="relative flex flex-col h-screen w-screen min-w-[1350px] pt-36">
            {blogs.map((blog, _) => {
                return (
                    <FeedItem textContent={blog.content} />
                );
            })}

            <p>loaded {blogs.length} blogs.</p>
        </div>
    );
}