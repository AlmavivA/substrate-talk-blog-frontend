import './BlogForm.css'

import {useState} from 'react'
import {TxButton} from "../substrate-lib/components";

const BlogForm = () => {
    const [blogPost, setBlogPost] = useState("");
    const [createBlogPostDisabled, setCreateBlogPostDisabled] = useState(true)

    const onBlogPostChange = (event) => {
        const {
            target: {value},
        } = event;
        setBlogPost(value);
        if(value.length >= 64) {
            setCreateBlogPostDisabled(false)
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
    };

    const onCreatBlogPost = async () => {
        console.log(`Send tx with: ${blogPost}`)
        setBlogPost("")
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="new-blog-post__controls">
                    <div className="new-blog-post__control">
                        <label>Blog post</label>
                        <textarea
                            className="form-control"
                            value={blogPost}
                            onChange={onBlogPostChange}
                        />
                    </div>
                </div>
                <div>
                    <TxButton
                        setStatus={onCreatBlogPost}
                        disabled={createBlogPostDisabled}
                        label="Create Blog post"
                        type="SIGNED-TX"
                        color="blue"
                        attrs={{
                            palletRpc: 'blog',
                            inputParams: [blogPost],
                            paramFields: ['content'],
                            callable: 'createBlogPost'
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default BlogForm;