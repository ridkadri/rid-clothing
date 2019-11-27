import React from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview';
import CollectionPage from '../collection/collection';

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils.js';
import {updateCollections} from '../../redux/shop/shop.actions.js';

import WithSpinner from '../../components/with-spinner/with-spinner';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);



class ShopPage extends React.Component {
    state = {
        loading: true
    }
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {updateCollections} = this.props;
        const collectionsRef = firestore.collection('collections');

        this.unsubscribefromSnapShot = collectionsRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState ({loading: false});
        });
    }

    render() {
        const {match} = this.props;
        const {loading} = this.state;
        return (
            <div className='shop-page'>
                <Route 
                    exact 
                    path = {`${match.path}`} 
                    render = {props => (
                        <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
                    )}
                />
                <Route 
                path= {`${match.path}/:collectionId`} 
                render={props => (
                    <CollectionPageWithSpinner isLoading={loading}{...props} />
                )}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});


export default connect(null, mapDispatchToProps)(ShopPage);