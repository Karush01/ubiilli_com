import React from 'react';
import StaticHeader from '@containers/StaticHeader';
import Loc from '@loc';
import PlacesCarousel from '@modules/PlacesCarousel';
import {GET_RECOMMENDED_PLACES} from '@queries/place';
import {useQuery} from "@apollo/client";

export default (props) => {


    const {loading, error, data} = useQuery(GET_RECOMMENDED_PLACES);

    return (
        <div>
            <StaticHeader
                icon={'not-found'}
                title={Loc.app.not_found}
            />
            <div className="container bg-white pt-4 pb-4">

                <PlacesCarousel
                    loading={loading}
                    data={!loading ? data.getRecommendedPlaces : []}
                    title={Loc.app.recommended}
                />

            </div>
        </div>
    )

}





