import React, {useState} from 'react';
import HeaderForm from '@containers/HeaderForm';
import PlaceContainer from '@containers/PlaceContainer';
import FindForm from '@modules/FindForm';
import Gallery from '@modules/Gallery';
import PlaceActions from '@modules/PlaceActions';
import PlaceDescription from '@modules/PlaceDescription';
import PlaceMap from '@modules/PlaceMap';
import PlaceSeats from '@modules/PlaceSeats';
import PlaceOptions from '@modules/PlaceOptions';
import PlaceMenu from '@modules/PlaceMenu';
import Reserve from '@modules/Reserve';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Loc from '@loc';
import scrollToComponent from 'react-scroll-to-component';
import {useQuery} from "@apollo/client";
import {GET_PLACE_BY_SLUG} from '@queries/place';
import NotFound from "@pages/NotFound";
import {GET_IS_AUTH} from "../store/queries";

export default (props) => {

    const {loading, error, data} = useQuery(GET_PLACE_BY_SLUG, {variables: {slug: props.match.params.slug}});

    const [reserveOpen, setReserveOpen] = useState(false);

    const [tab, setTab] = useState(0);

    const {data: auth} = useQuery(GET_IS_AUTH);

    const handleChange = (e, value) => {

        setTab(value);

        scrollToComponent(document.getElementById('item-scrollable-auto-tab-' + value), {
            offset: -50,
            align: 'top',
            duration: 450
        })
    };


    const handleCloseReserve = () => {
        setReserveOpen(false)
    };

    if ((!loading && _.isUndefined(data)) || !_.isUndefined(error))
        return (<NotFound/>);

    return (
        <section className={'bg-light'}>
            <HeaderForm>
                <FindForm/>
            </HeaderForm>
            <div className="container">
                <div className="row  mt-3 mb-3">
                    <div className="col-12 col-lg-8">
                        <Gallery
                            loading={loading}
                            data={data}
                        />
                        <div className={'d-lg-none mt-3'}>
                            <PlaceActions
                                handleOpenReserve={setReserveOpen}
                                loading={loading}
                                data={data}
                            />
                        </div>
                        <Tabs
                            value={tab}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            className={'mt-4 mb-4 place-tabs position-sticky'}
                        >
                            {Object.keys(Loc.app.place_info).map((item, index) => (
                                <Tab
                                    key={index}
                                    label={Loc.app.place_info[item]}
                                    id={'scrollable-auto-tab-' + item}/>
                            ))}
                        </Tabs>
                        <div className="col-12" id={'items-list'}>
                            {Object.keys(Loc.app.place_info).map((item, index) => (
                                <PlaceContainer
                                    key={index}
                                    item={item}
                                    activeItem={setTab}
                                >
                                    {item == 0 ?
                                        <PlaceDescription
                                            loading={loading}
                                            data={data}
                                        />
                                        : item == 1 ?
                                            <PlaceSeats
                                                loading={loading}
                                                data={data}
                                            /> : item == 2 ?
                                                <PlaceMenu
                                                    handleOpenReserve={setReserveOpen}
                                                    loading={loading}
                                                    data={data}
                                                /> :
                                                <PlaceOptions
                                                    data={data}
                                                    loading={loading}
                                                />
                                    }
                                </PlaceContainer>
                            ))}
                        </div>
                    </div>
                    <div className="col-12 col-md-4 d-none d-lg-block">
                        <PlaceActions
                            handleOpenReserve={setReserveOpen}
                            loading={loading}
                            data={data}
                        />
                    </div>
                    {!loading &&
                    <div className="col-12">
                        <PlaceMap data={data}/>
                    </div>
                    }
                </div>
            </div>
            {!loading && reserveOpen &&
            <Reserve
                type={reserveOpen}
                openAuth={props.openAuth}
                place={data}
                handleOpenReserve={setReserveOpen}
                handleClickClose={handleCloseReserve}
                open={reserveOpen !== false}
            />
            }
        </section>
    )

}





