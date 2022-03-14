import React, {createRef, useState} from 'react'
import {
    Container,
    Dimmer,
    Loader,
    Grid,
    Sticky,
    Message,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'

import {SubstrateContextProvider, useSubstrateState} from './substrate-lib'
import {DeveloperConsole} from './substrate-lib/components'

import AccountSelector from './AccountSelector'
import Balances from './Balances'
import BlockNumber from './BlockNumber'
import Events from './Events'
import Interactor from './Interactor'
import Metadata from './Metadata'
import NodeInfo from './NodeInfo'
import TemplateModule from './TemplateModule'
import Transfer from './Transfer'
import Upgrade from './Upgrade'
import Blog from './components/Blog'

function Main() {
    const [showComponent, setShowComponent] = useState('blog')
    const {apiState, apiError, keyringState} = useSubstrateState()

    const loader = text => (
        <Dimmer active>
            <Loader size="small">{text}</Loader>
        </Dimmer>
    )

    const message = errObj => (
        <Grid centered columns={2} padded>
            <Grid.Column>
                <Message
                    negative
                    compact
                    floating
                    header="Error Connecting to Substrate"
                    content={`Connection to websocket '${errObj.target.url}' failed.`}
                />
            </Grid.Column>
        </Grid>
    )

    if (apiState === 'ERROR') return message(apiError)
    else if (apiState !== 'READY') return loader('Connecting to Substrate')

    if (keyringState !== 'READY') {
        return loader(
            "Loading accounts (please review any extension's authorization)"
        )
    }

    const onAdminClicked = (event) => {
        event.preventDefault()
        setShowComponent('admin')
    }

    const onBlogClicked = (event) => {
        event.preventDefault()
        setShowComponent('blog')
    }

    const contextRef = createRef()

    return (
        <div ref={contextRef}>
            <Sticky context={contextRef}>
                <AccountSelector/>
            </Sticky>
            <div className="container">
                <div className="row">
                    <Container>
                        <div className="container">
                            <div className="row">
                                <div className="col-1">
                                    <button className="btn-link" onClick={onAdminClicked}>Admin</button>
                                </div>
                                <div className="col-1">
                                    <button className="btn-link" onClick={onBlogClicked}>Blog</button>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
                <div className="row" style={{margin: '20px'}}>
                    {showComponent === 'admin' && (
                        <div>
                            <Container>
                                <Grid stackable columns="equal">
                                    <Grid.Row stretched>
                                        <NodeInfo/>
                                        <Metadata/>
                                        <BlockNumber/>
                                        <BlockNumber finalized/>
                                    </Grid.Row>
                                    <Grid.Row stretched>
                                        <Balances/>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Transfer/>
                                        <Upgrade/>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Interactor/>
                                        <Events/>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <TemplateModule/>
                                    </Grid.Row>
                                </Grid>
                            </Container>
                            <DeveloperConsole/>
                        </div>
                    )}
                    {showComponent === 'blog' && <Blog/>}
                </div>
            </div>
        </div>
    )
}

export default function App() {
    return (
        <SubstrateContextProvider>
            <Main/>
        </SubstrateContextProvider>
    )
}
