import './BlogPostItem.css'
import {TxButton} from "../substrate-lib/components";
import {useState} from 'react'


const BlogPostItem = (props) => {
    const {hash, content, author} = props

    const onSendTip = async () => {
        console.log("Sending tip to the author")
    }

    return (
        <li>
            <div className="card blog-post-item">
                <div className="blog-post-item__content">Content: {content}</div>
                <div className="blog-post-item__author">Published by: {author}</div>
                <div className="blog-post-item__hash">With hash: {hash}</div>
                <div className="align-self-end">
                    {/*<button type="button" className="btn btn-success blog-post-item__send-tip">Send a tip</button>*/}
                    <TxButton
                        setStatus={onSendTip}
                        disabled={false}
                        label="Send a tip"
                        type="SIGNED-TX"
                        color="green"
                        attrs={{
                            palletRpc: 'blog',
                            inputParams: [hash, 100000],
                            paramFields: ['blogPostId', 'amount'],
                            callable: 'tipBlogPost'
                        }}
                    />
                </div>
            </div>
        </li>
    );
}

export default BlogPostItem