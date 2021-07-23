import React, {useState, useRef} from 'react';
import Preloader from './Preloader';
import Item from './Item';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Slider from "react-slick";


export default (props) => {

    const [items, setItems] = useState(5);

    const refAnnounce = useRef();

    const preloaders = () => {

        let result = [];

        for (let i = 0; i < items; i++)
            result.push(
                <Preloader key={i}/>
            )

        return result;
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="row mt-5 mb-4">
            <div className="col-7 pr-1 align-self-center">
                <div className="h5 mb-0 font-weight-bold carousel-header">{props.title}</div>
            </div>
            <div className="col-5 pl-1 text-right align-self-center">
                <div className={''}>
                    <IconButton
                        onClick={() => {
                            refAnnounce.current.slickPrev();
                        }}
                        className={'left-chevron mr-3 mr-md-4 p-2'}
                        size="medium">
                        <ArrowBackIcon fontSize="inherit"/>
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            refAnnounce.current.slickNext();
                        }}
                        className={'right-chevron p-2'}
                        size="medium">
                        <ArrowForwardIcon fontSize="inherit"/>
                    </IconButton>
                </div>
            </div>
            <div className="col-12 carousel-wrapp">

                <Slider
                    ref={refAnnounce}
                    {...settings}>
                    {props.loading ?
                        preloaders()
                        :
                        props.data.map((item, index) => (
                            <Item
                                key={index}
                                item={item}
                            />
                        ))
                    }
                </Slider>
            </div>
        </div>
    )

}





