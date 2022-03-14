import './BlogPostItem.css'
import {useState} from 'react'
import {TxButton} from "../substrate-lib/components";
import {useSubstrateState} from "../substrate-lib";

const BlogPostItem = (props) => {
    const {hash, content, author} = props

    const [sendTipDisabled, setSendTipDisabled] = useState(false)
    const {api, currentAccount} = useSubstrateState()

    api.query.system.account(currentAccount.address, (balance) => {
        if (currentAccount.address === author) {
            setSendTipDisabled(true)
        } else {
            setSendTipDisabled(false)
        }
    })
        .then(unsubscribe => unsubscribe())
        .catch(error => {
            console.error(error)
        })

    const onSendTip = async () => {
        console.log("Sending tip to the author")
    }

    return (
        <li>
            <div className="card blog-post-item">
                <div className="blog-post-item__content">Content: {content}</div>
                <div className="blog-post-item__author">Published by: {author}</div>
                <div className="blog-post-item__hash">With tx hash: {hash}</div>
                <div className="align-self-end">
                    {/*<button type="button" className="btn btn-success blog-post-item__send-tip">Send a tip</button>*/}
                    <TxButton
                        setStatus={onSendTip}
                        disabled={sendTipDisabled}
                        label="Send a tip"
                        type="SIGNED-TX"
                        color="green"
                        attrs={{
                            palletRpc: 'blog',
                            inputParams: [hash, 100],
                            paramFields: ['blogPostId', 'amount'],
                            callable: 'tipBlogPost'
                        }}
                    />
                </div>
                {sendTipDisabled && (
                    <div className="alert alert-danger" role="alert">
                        Cannot send a tip to himself
                    </div>
                )}
            </div>
        </li>
    );
}

export default BlogPostItem