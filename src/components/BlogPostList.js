import BlogPostItem from "./BlogPostItem"
import './BlogPostList.css'

const removeDuplicates = (array) => {
    let result = []
    array.forEach(function (item) {
        const existing = result.filter((v, i) => v.hash === item.hash);
        if (existing.length === 0) {
            result.push(item);
        }
    });
    return result
}

let initialData = []

const BlogPostList = (props) => {
    let {blogPosts} = props;
    if (initialData.length === 0) {
        initialData = blogPosts
    } else {
        initialData.push(...blogPosts)
        initialData = removeDuplicates(initialData)
        blogPosts = initialData
    }

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