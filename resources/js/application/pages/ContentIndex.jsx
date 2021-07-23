import React from 'react';
import MainScreen from '@modules/MainScreen';
import PlacesCarousel from '@modules/PlacesCarousel';
import OurAdvantages from '@modules/OurAdvantages';
import RegisterBlock from '@modules/RegisterBlock';
import Loc from '@loc';
import {GET_RECOMMENDED_PLACES, GET_CITY_PLACES} from '@queries/place';
import {useQuery} from "@apollo/client";
import {GET_ACTIVE_CITY} from '../store/queries';

const ContentIndex = (props) => {

    const {loading, error, data} = useQuery(GET_RECOMMENDED_PLACES);

    const {data: activeCityData} = useQuery(GET_ACTIVE_CITY);

    const {loading: cityLoading, error: cityError, data: cityData} = useQuery(GET_CITY_PLACES, {
        variables: {cityId: activeCityData.activeCity.id},
    });


    return (
        <div>
            <MainScreen/>
            <div className="container">
                <PlacesCarousel
                    loading={loading}
                    data={!loading ? data.getRecommendedPlaces : []}
                    title={Loc.app.recommended}
                />
                <OurAdvantages/>

                <PlacesCarousel
                    loading={cityLoading}
                    data={!cityLoading ? cityData.getCityPlaces : []}
                    title={Loc.app.rest_in + ' ' + activeCityData.activeCity.name}
                />

            </div>
            <RegisterBlock
                openAuth={props.openAuth}
            />
        </div>
    )

}

export default ContentIndex;


