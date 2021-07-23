import React, {useState, useEffect} from 'react';
import Loc from '@loc';
import 'date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import {parseDate} from '@hooks/helperHooks';
import {GET_PLACE_SCHEDULE} from '@queries/place';
import {useQuery} from "@apollo/client";
import Carousel from './Carousel';
import moment from 'moment';
import {datesFormat} from '@app';

export default (props) => {

    const [currentTime, setCurrentTime] = useState(new Date().getHours() + ":" + (new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes());

    const [today, setToday] = useState(null);

    const [tomorrow, setTomorrow] = useState(null);

    const [openPicker, setOpenPicker] = useState(false);

    const handleDateChange = (date) => {

        setOpenPicker(!openPicker);

        props.setData(parseDate(date), props.property, props.propertyTime);

    };

    const {loading, error, data} = useQuery(GET_PLACE_SCHEDULE, {
        variables: {
            slug: props.slug,
            date: props.data.date
        }
    });

    const formatTimes = (times) => {


        let result = [];

        if (props.data.date == today) {

            const parsedTime = parseInt(currentTime.replace(':', ''));

            times.map((item, index) => {

                if (parseInt(item.replace(':', '')) >= parsedTime)
                    result.push(item);

            });

        } else {
            result = times;
        }

        return result;
    }

    useEffect(() => {

        const date = new Date(_sharedData.currentDate);

        setToday(parseDate(date));

        date.setDate(date.getDate() + 1);

        setTomorrow(parseDate(date));

    }, []);


    return (
        <div className="col-12 pl-5 pr-5 ml-3 mr-3 mb-4">
            <div className="h6 font-weight-light mb-3">{Loc.app.select_date}</div>
            <div className="row mb-3">
                <div className="col-12 col-md-4 mb-2">
                    <Button
                        disabled={props.disabledToday}
                        onClick={e => props.setData(today, props.property, props.propertyTime)}
                        className={'w-100 carousel-item-slide ' + (props.data.date == today && ' active-slide ')}>{Loc.app.today}</Button>
                </div>
                <div className="col-12 col-md-4 mb-2">
                    <Button
                        onClick={e => props.setData(tomorrow, props.property, props.propertyTime)}
                        className={'w-100 carousel-item-slide ' + (props.data.date == tomorrow && ' active-slide ')}>{Loc.app.tomorrow}</Button>
                </div>

                <div className="col-12 col-md-4 mb-2">
                    <Button
                        onClick={e => setOpenPicker(!openPicker)}
                        className={'w-100 carousel-item-slide ' + (props.data.date != today && props.data.date != tomorrow && ' active-slide ')}>
                        {(props.data.date != today && props.data.date != tomorrow) ? props.data.date : Loc.app.other_date}
                    </Button>

                    {!_.isUndefined(props.data.date) && !_.isNull(props.data.date) &&
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            autoOk
                            minDate={!props.disabledToday ? new Date() : new Date().setDate(new Date().getDate() + 1)}
                            clearable={false}
                            onClose={e => setOpenPicker(!openPicker)}
                            className={'d-none'}
                            open={openPicker}
                            value={moment(props.data.date, datesFormat.date).toDate()}
                            onChange={handleDateChange}
                        />
                    </MuiPickersUtilsProvider>
                    }
                </div>
            </div>
            <div className="h6 font-weight-light mb-3">{Loc.app.select_time}</div>
            <Carousel
                failText={Loc.app.bad_date}
                loading={loading || _.isNull(props.data.date)}
            >
                {!_.isUndefined(data) && formatTimes(data.getPlaceSchedule).map((item, index) => (
                    <div
                        onClick={e => props.setData(item, props.propertyTime)}
                        key={index}
                    >
                        <div
                            className={"m-2 text-center pt-3 pb-3  carousel-item-slide " + (props.data.time == item && ' active-slide ')}>
                            {item}
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )

}





