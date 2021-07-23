import React, {useState, useEffect} from 'react';
import Preloader from './Preloader';
import ImageLoader from '@components/ImageLoader';
import Loc from '@loc';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import GalleryImageItem from './GalleryImageItem';

export default (props) => {

    const [activePicture, setActivePicture] = useState(0);

    const [activeModal, setActiveModal] = useState(false);

    const [thumbItems, setThumbItems] = useState(2);

    const [documentWidth, setDocumentWidth] = useState(document.documentElement.clientWidth)

    const nextPicture = () => {

        if (activePicture != (props.data.getPlace.pictures.length - 1))
            setActivePicture((activePicture + 1));

    }

    const prevPicture = () => {

        if ((activePicture - 1) >= 0)
            setActivePicture((activePicture - 1));

    }

    const generateThumbs = () => {

        let result = [];

        for (let i = 0; i < thumbItems; i++)
            result.push(
                <div
                    key={i}
                    onClick={e => activateModal(e)}
                    onMouseEnter={e => setActivePicture(i, e)}
                    className={'col-12 pr-0 pl-0'}>
                    <ImageLoader
                        className={'rounded-image cursor-pointer'}
                        src={props.data.getPlace.pictures[i].picture.place_medium_picture}/>
                    {i + 1 == thumbItems &&
                    <div className="more-items-block rounded-image cursor-pointer ">
                        <span>{Loc.app.yet} {props.data.getPlace.pictures.length - thumbItems}</span>
                    </div>
                    }
                </div>
            )

        return result
    }

    const activateModal = () => {

        document.getElementsByTagName('body')[0]
            .setAttribute('style', 'overflow: hidden !important; position:fixed');

        setActiveModal(true);

    }

    const closeModal = () => {

        document.getElementsByTagName('body')[0]
            .removeAttribute('style');

        setActiveModal(false);

    }

    const updateDimensions = () => {

        setDocumentWidth(document.documentElement.clientWidth);

    }

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
    });

    return (
        <div className="row">
            <div className="col-12">
                {props.loading ?
                    <Preloader/>
                    :
                    <div className="row">
                        {activeModal &&
                        <div className="big-view">
                            <div className="top-header-gallery">
                                <CloseIcon
                                    className={'close-gallery'}
                                    onClick={e => closeModal(e)}
                                />
                            </div>

                            <div className={(activePicture == 0 ? 'd-none ' : "") + "nav-left-button"}
                                 onClick={e => prevPicture(e)}>
                                <ChevronLeftIcon className={'nav-icon'}/>
                            </div>
                            <div
                                className={(activePicture == props.data.getPlace.pictures.length - 1 ? 'd-none ' : "") + "nav-right-button"}
                                onClick={e => nextPicture(e)}>
                                <ChevronRightIcon className={'nav-icon'}/>
                            </div>


                            {props.data.getPlace.pictures.length > 0 &&
                            <div className="h-100 row justify-content-center align-items-center gallery-content">
                                <div className="col-12 text-center">
                                    <ul className={'list-unstyled p-0 big-gallery-container'} style={{
                                        width: documentWidth * props.data.getPlace.pictures.length,
                                        transform: 'translateX(-' + documentWidth * activePicture + 'px)'
                                    }}>
                                        {props.data.getPlace.pictures.map((item, index) => (
                                            <GalleryImageItem
                                                key={index}
                                                width={documentWidth}
                                                active={activePicture == index}
                                                src={item.picture.place_huge_picture}
                                            />
                                        ))
                                        }
                                    </ul>
                                </div>
                            </div>
                            }

                        </div>
                        }
                        <div className="col-12 col-md-8 ">
                            <div className="middle-image">
                                {props.data.getPlace.pictures.length > 1 &&
                                <IconButton
                                    onClick={e => prevPicture(e)}
                                    className="nav-left cursor-pointer">
                                    <ChevronLeftIcon/>
                                </IconButton>
                                }
                                <ImageLoader
                                    onClick={e => activateModal(e)}
                                    className={'rounded-image cursor-pointer'}
                                    src={props.data.getPlace.pictures[activePicture].picture.place_large_picture}/>
                                {props.data.getPlace.pictures.length > 1 &&
                                <IconButton
                                    onClick={e => nextPicture(e)}
                                    className="nav-right  cursor-pointer">
                                    <ChevronRightIcon/>
                                </IconButton>
                                }
                            </div>
                        </div>
                        <div className="col-12 col-md-4 d-md-block d-none">
                            <div className="align-content-between d-flex flex-wrap h-100">
                                {generateThumbs()}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )

}





