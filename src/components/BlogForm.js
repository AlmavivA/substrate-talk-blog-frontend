import './BlogForm.css'

import {useState} from 'react'
import {TxButton} from "../substrate-lib/components";
// import {useSubstrateState} from '../substrate-lib'
// import {web3FromSource} from "@polkadot/extension-dapp";

const BlogForm = (/*{onNewBlogPost}*/) => {
    // const {api, currentAccount} = useSubstrateState()
    // const [unsub, setUnsub] = useState(null)
    const [blogPost, setBlogPost] = useState("");
    const [createBlogPostDisabled, setCreateBlogPostDisabled] = useState(true)

    // const getFromAcct = async () => {
    //     const {
    //         address,
    //         meta: {source, isInjected},
    //     } = currentAccount
    //
    //     if (!isInjected) {
    //         return [currentAccount]
    //     }
    //
    //     // currentAccount is injected from polkadot-JS extension, need to return the addr and signer object.
    //     // ref: https://polkadot.js.org/docs/extension/cookbook#sign-and-send-a-transaction
    //     const injector = await web3FromSource(source)
    //     return [address, {signer: injector.signer}]
    // }

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

        // const fromAcct = await getFromAcct()
        // // const transformed = transformParams(paramFields, inputParams)
        // // transformed can be empty parameters
        //
        // const txExecute = api.tx['blog']['createBlogPost']([blogPost])
        //
        // const unsub = await txExecute
        //     .signAndSend(...fromAcct, (result)=>{
        //         console.info(result)
        //     })
        //     .catch(error => {
        //         console.error('Error:', error)
        //     })
        //
        // setUnsub(() => unsub)
        // console.log(`Submitted: ${blogPost}`)
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
                    {/*<button className="btn btn-primary">Create Blog Post</button>*/}
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