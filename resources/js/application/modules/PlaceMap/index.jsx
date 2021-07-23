import React from 'react';
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';

const AnyReactComponent = ({}) => <RoomIcon className={'text-danger'} width={76} height={76}/>;

export default (props) => {

    const defaultProps = {
        center: {
            lat: props.data.getPlace.latitude,
            lng: props.data.getPlace.longitude
        },
        zoom: 11
    };
    return (

        <div className={'mt-4'} style={{height: '45vh', width: '100%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: _sharedData.mapsKey}}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                    lat={props.data.getPlace.latitude}
                    lng={props.data.getPlace.longitude}
                />

            </GoogleMapReact>
        </div>

    )

}





