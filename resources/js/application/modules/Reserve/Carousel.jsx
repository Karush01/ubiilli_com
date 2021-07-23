import React, {useRef, useEffect} from 'react';
import Slider from "react-slick";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Skeleton from '@material-ui/lab/Skeleton';

export default (props) => {

    const preloader = () => {

        let result = [];

        for (let i = 0; i < 8; i++)
            result.push(
                <div
                    key={i}
                    className={'w-100 pl-2 pr-2 mt-2'}>
                    <Skeleton variant="rect" width={'100%'} height={57}/>
                </div>
            )

        return result;
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        adaptiveHeight: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };

    const refAnnounce = useRef();

    useEffect(() => {

        if (refAnnounce.current)
            refAnnounce.current.slickGoTo(null)

    }, [props.children]);


    if (props.children.length == 0 && !props.loading)
        return <div className="d-block position-relative">
            <div className="h6 font-weight-light text-center mb-4 mt-4 w-75 mx-auto">{props.failText}</div>
        </div>;

    return (
        <div className={'d-block position-relative'}>
            <IconButton
                onClick={() => {
                    refAnnounce.current.slickPrev();
                }}
                className={'left-chevron position-absolute carousel-nav-left'}
                size="medium">
                <ArrowBackIcon fontSize="inherit"/>
            </IconButton>
            <Slider
                className={'ml-3 mr-3'}
                ref={refAnnounce}
                {...settings}>
                {props.loading ?
                    preloader()
                    :
                    props.children
                }
            </Slider>
            <IconButton
                onClick={() => {
                    refAnnounce.current.slickNext();
                }}
                className={'right-chevron  position-absolute carousel-nav-right'}
                size="medium">
                <ArrowForwardIcon fontSize="inherit"/>
            </IconButton>
        </div>
    )

}





