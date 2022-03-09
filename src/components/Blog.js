import "./Blog.css";
import BlogForm from "./BlogForm";
import BlogPostList from "./BlogPostList";
import {useEffect, useState} from "react";
import {useSubstrateState} from "../substrate-lib";

const initialData = []

const Blog = () => {
    const {api} = useSubstrateState()
    const [blogPosts, setBlogPosts] = useState(initialData);

    const onBlogPostAdded = (blogPost) => {
        if (!blogPosts.includes(blogPost)) {
            setBlogPosts((previousBlogPosts) => {
                return [blogPost, ...previousBlogPosts];
            });
        }
    }

    const FILTERED_EVENTS = [
        'blog:BlogPostCreated',
    ]

    const eventName = ev => `${ev.section}:${ev.method}`
    const eventParams = ev => JSON.stringify(ev.data)

    useEffect(() => {
        let unsub = null
        const allEvents = async () => {
            unsub = await api.query.system.events(events => {
                // loop through the Vec<EventRecord>
                events.forEach(record => {
                    // extract the phase, event and the event types
                    const {event, phase} = record

                    // show what we are busy with
                    const evHuman = event.toHuman()
                    const evName = eventName(evHuman)
                    const evParams = eventParams(evHuman)
                    const evNamePhase = `${evName}::(phase=${phase.toString()})`

                    if (FILTERED_EVENTS.includes(evName)) {
                        console.log('EventHuman:', evHuman)
                        console.log('EventName:', evName)
                        console.log('EventParams:', evParams)
                        console.log('EventNamePhase:', evNamePhase)
                        const [content, author, hash] = evParams.replace(/"/g, '')
                            .replace(/\[/g, '')
                            .replace(/]/g, '')
                            .split(',')
                        onBlogPostAdded({
                            hash,
                            content,
                            author,
                        });
                    }

                    // if (FILTERED_EVENTS.includes(evNamePhase)) return
                    // setEventFeed(e => [
                    //     {
                    //         key: keyNum,
                    //         icon: 'bell',
                    //         summary: evName,
                    //         content: evParams,
                    //     },
                    //     ...e,
                    // ])
                    // keyNum += 1
                })
            })
        }
        allEvents()
        return () => unsub && unsub()
    }, [api.query.system])

    return (
        <div className="blog">
            {/*<BlogForm onNewBlogPost={onBlogPostAdded}/>*/}
            <div className="d-flex align-items-center justify-content-center">
                <BlogForm/>
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <BlogPostList blogPosts={blogPosts}/>
            </div>
        </div>
    )
}

export default Blog;

// export default function Blog() {
//     const {api} = useSubstrateState()
//     return api && api.query && api.query.system && api.query.system.events ? (
//         <BlogDefinition />
//     ) : null
// }