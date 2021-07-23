import React, {useState, useEffect} from 'react';
import Title from "../Title";
import Loc from '@loc';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Place from "@modules/PlaceHandler/Place";
import Address from "@modules/PlaceHandler/Address";
import Pictures from "@modules/PlaceHandler/Pictures";
import Schedule from "@modules/PlaceHandler/Schedule";
import StepperButtons from "./StepperButtons";
import {PLACE_HANDLER_MUTATION} from '@mutations/user';
import {useMutation} from "@apollo/client";
import useNotification from '@hooks/notificationHooks';
import {useQuery} from "@apollo/client";
import {GET_PLACE_BY_SLUG} from '@queries/place';
import {fetchingData} from '@app';
import AccountPreloader from "@components/AccountPreloader";

const getInitialState = () => {
    return {
        place: {
            name: '',
            description: '',
            type_id: '',
            phone: '',
            delivery: false,
            middle_price: '',
            tables_count: '',
            tables_seats: '',
            city_id: '',
            address: '',
            zip: '',
        },
        kitchens: [],
        pictures: [],
        options: [],
        place_schedule: []
    }
}

export default (props) => {

    const {loading: placeLoading, error, data: placeData} = useQuery(GET_PLACE_BY_SLUG, {
        variables: {
            slug: props.activePlace
        },
        fetchPolicy: fetchingData.noCache,
        skip: _.isUndefined(props.activePlace)
    });

    const [placeHandler, {loading}] = useMutation(PLACE_HANDLER_MUTATION);

    const [data, setData] = useState(getInitialState());

    const [activeStep, setActiveStep] = useState(0);

    const [steps] = useState([
        [
            'place.name',
            'place.type_id',
            'place.phone',
            'place.delivery',
            'place.middle_price',
            'place.tables_count',
            'place.tables_seats',
            'place.description',
            'kitchens',
            'options'
        ],
        [
            'place.city_id',
            'place.address',
            'place.zip',
        ],
        [
            'place_schedule'
        ],
        [
            'pictures'
        ]
    ]);

    const {setErrorHandled, successNotification} = useNotification();

    const handleNext = async () => {

        if (activeStep == steps.length - 1) {

            let response = await sendPlaceData();

            //виберемо активний крок
            if (response != null) {

                steps.every((elem, index) => {

                    let res = _.find(elem, (o) => {
                        return response.graphQLErrors[0].extensions.some.indexOf(o) !== -1
                    });

                    if (!_.isUndefined(res)) {
                        setActiveStep(index);
                        setErrorHandled(response.graphQLErrors);

                        document.getElementById('place-stepper').scrollIntoView(true);

                        return false;

                    }

                    return true;

                });

            }

        } else {
            setActiveStep(activeStep + 1);
        }

    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const sendPlaceData = async () => {

        let result = null;

        let sendData = _.cloneDeep(data);

        //зробимо порядок з графіками

        let schedule = [];

        sendData.place_schedule.map((item, index) => {

            schedule[index] = item;
            delete schedule[index].name;

        });

        //зробимо порядок з картинками

        let pictures = _.map(sendData.pictures, (item, index) => {

            if (item.error !== true)
                return {isCover: item.isCover, name: _.last(item.filename.split("?")[0].split('/'))}

        });

        await placeHandler({
            variables: {
                place: sendData.place,
                kitchens: sendData.kitchens,
                pictures: pictures,
                options: sendData.options,
                place_schedule: schedule
            }
        }).then((response) => {

            setActiveStep(activeStep + 1);

            setData(getInitialState());

            successNotification(response.data.placeHandler.message);

            props.activeTabHandler(props.tabs.changePlaceMenu.label, response.data.placeHandler.slug);


        }).catch((error) => {
            result = error;
        });

        return result;


    };

    const changePictures = (value, index = undefined) => {

        const newData = {...data};

        if (index !== undefined)
            newData.pictures[index] = value;
        else
            newData.pictures = value;

        setData(newData);

    };

    const deletePicture = (index) => {

        const newData = {...data};

        let isCover = false;

        if (newData.pictures[index].isCover == true)
            isCover = true;

        newData.pictures.splice(index, 1);

        if (isCover) {

            let k = _.findKey(newData.pictures, function (o) {
                return true;
            });

            if (newData.pictures[k] !== undefined)
                newData.pictures[k].isCover = true;
        }

        setData(newData);

    };

    const changeCover = (index) => {

        const newData = {...data};

        let key = _.findKey(newData.pictures, function (o) {
            return o.isCover == true;
        });

        if (newData.pictures.hasOwnProperty(key))
            delete newData.pictures[key].isCover;


        newData.pictures[index].isCover = true;

        setData(newData);

    };

    const changeData = (parent, value, property = undefined) => {

        const newData = {...data};

        if (!_.isUndefined(property))
            newData[parent][property] = value;
        else
            newData[parent] = value;

        setData(newData);

    };

    useEffect(() => {

        if (!_.isUndefined(props.activePlace) && !_.isUndefined(placeData))
            parsePlace(placeData.getPlace);


    }, [placeData]);

    const parsePlace = (place) => {

        let pl = {};
        let pictures = [];
        let kitchens = [];
        let options = [];
        let schedules = [];

        Object.keys(place).map((item, index) => {

            //зробимо порядок з основною інформацією
            if (!_.isObject(place[item]) && !_.isArray(place[item])) {
                pl[item] = place[item];
            } else if (item == 'pictures') {
                place.pictures.map((el, index) => {

                    pictures.push({
                        filename: el.picture.place_medium_picture,
                        uploaded: true,
                        isCover: place.picture_id == el.picture.id ? true : undefined
                    })

                });
            } else if (item == 'placeKitchens') {
                kitchens = _.map(place[item], 'kitchen.id');
            } else if (item == 'placeOptions') {
                options = _.map(place[item], 'option.id');
            } else if (item == 'schedules') {

                place[item].map((el, key) => {

                    schedules.push({
                        name: el.day.description.name,
                        day_id: el.day_id,
                        open: el.open,
                        close: el.close,
                        active: el.active,
                    });
                })
            }
        });

        const newData = {...data};

        delete pl.__typename;
        delete pl.slug;
        delete pl.rating;
        delete pl.picture_id;

        newData.place = Object.assign(newData.place, pl);

        newData.pictures = pictures;
        newData.kitchens = kitchens;
        newData.options = options;
        newData.place_schedule = schedules;

        setData(newData);

    };

    if (placeLoading)
        return <AccountPreloader/>;

    return (
        <div className="row">
            <Title
                title={!_.isUndefined(props.activePlace) && !_.isUndefined(placeData) ? Loc.app.account_menu.edit_place : Loc.app.account_menu.add_place}
            />
            <div className="col-12 scrolled-block mb-5 pb-5">
                <Stepper
                    id={'place-stepper'}
                    className={'bg-light p-0'}
                    activeStep={activeStep}
                    orientation="vertical">
                    <Step key={0}>
                        <StepLabel className={'font-weight-light'}>{Loc.app.main_info}</StepLabel>
                        <StepContent className={'p-2'}>
                            <Place
                                changeData={changeData}
                                parent={'place'}
                                data={data.place}
                                options={data.options}
                                kitchens={data.kitchens}
                            />
                            <StepperButtons
                                activeStep={activeStep}
                                steps={steps}
                                handleNext={handleNext}
                                handleBack={handleBack}
                            />
                        </StepContent>
                    </Step>
                    <Step key={1}>
                        <StepLabel className={'font-weight-light'}>{Loc.app.address_info}</StepLabel>
                        <StepContent
                            className={'p-2'}
                        >
                            <Address
                                changeData={changeData}
                                parent={'place'}
                                data={data.place}
                            />
                            <StepperButtons
                                activeStep={activeStep}
                                steps={steps}
                                handleNext={handleNext}
                                handleBack={handleBack}
                            />
                        </StepContent>
                    </Step>
                    <Step key={2}>
                        <StepLabel className={'font-weight-light'}>{Loc.app.schedule_info}</StepLabel>
                        <StepContent
                            className={'p-2'}
                        >
                            <Schedule
                                parent={'place_schedule'}
                                changeData={changeData}
                                data={data.place_schedule}
                            />
                            <StepperButtons
                                activeStep={activeStep}
                                steps={steps}
                                handleNext={handleNext}
                                handleBack={handleBack}
                            />
                        </StepContent>
                    </Step>
                    <Step key={3}>
                        <StepLabel className={'font-weight-light'}>{Loc.app.photos}</StepLabel>
                        <StepContent
                            className={'p-2'}
                        >
                            <Pictures
                                deletePicture={deletePicture}
                                changeCover={changeCover}
                                changePictures={changePictures}
                                pictures={data.pictures}
                            />

                            <StepperButtons
                                activeStep={activeStep}
                                steps={steps}
                                handleNext={handleNext}
                                handleBack={handleBack}
                                loading={loading}
                            />

                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        </div>
    )
}
