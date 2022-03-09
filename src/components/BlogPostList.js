import BlogPostItem from "./BlogPostItem";
import './BlogPostList.css'

const removeDuplicates = (propertyFn, array) => {
    const set = new Set();
    return array.filter((elem) => {
        const key = propertyFn(elem)
        const isNew = !set.has(key)
        if (isNew) {
            set.add(key)
        }
        return isNew;
    });
}

const BlogPostList = (props) => {
    const {blogPosts} = props;
    // if (blogPosts.length === 0) {
    //     return <h2>No Blog Posts yet</h2>;
    // }

    // const filtered = removeDuplicates(blogPost => blogPost.key, blogPosts)

    return (
        <ul className="blog-posts-list">
            {blogPosts.map((blogPost) => (
                <BlogPostItem
                    key={blogPost.hash}
                    hash={blogPost.hash}
                    content={blogPost.content}
                    author={blogPost.author}
                />
            ))}
        </ul>
    );
}

export default BlogPostList