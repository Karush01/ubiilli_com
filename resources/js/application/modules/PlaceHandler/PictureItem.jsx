import React, {useState, useEffect} from 'react';
import Loc from '@loc';
import WarningIcon from '@material-ui/icons/Warning';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export default (props) => {

    const [pictureLink, setPictureLink] = useState(undefined);

    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(() => {

        setIsLoaded(false);

        loadImage(props.link);

    }, [props.link]);

    const loadImage = (src) => {

        let img = new Image();

        img.onload = () => {

            setPictureLink(src);

            setIsLoaded(true);

        };
        img.src = src;
    };
    
    return (
        <div className="col-6 col-sm-4 col-md-3 pl-1 pr-1">
            <div
                style={{backgroundImage: 'url(' + pictureLink + ')'}}
                className="photo-item">
                {props.item.isCover &&
                <div className="main-picture text-lowercase">{Loc.app.cover}</div>
                }

                {props.item.uploaded && isLoaded ?
                    <div className="photo-item-container ">
                        <div className={'top-picture-helpers'}>
                            <Tooltip
                                className={'remove-picture'}
                                title={Loc.app.remove}>
                                <HighlightOffIcon
                                    onClick={e => props.deletePicture(props.index)}
                                    className={'text-white '}/>
                            </Tooltip>
                        </div>
                        {!props.item.isCover &&
                        <div
                            onClick={e => props.changeCover(props.index)}
                            className="change-main text-lowercase">{Loc.app.make_cover}</div>
                        }
                    </div>
                    :
                    props.item.error ?
                        <div className="picture-upload  photo-item-container ">
                            <WarningIcon className={'text-white image-preloader'}/>
                        </div>
                        :
                        <div className="picture-upload  photo-item-container ">
                            <CircularProgress
                                className={'text-white'}
                                size={26}
                                thickness={4}
                            />
                        </div>
                }
            </div>
        </div>
    )

}




