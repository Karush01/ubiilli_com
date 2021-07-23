import React, {useState} from 'react';
import {useDropzone} from 'react-dropzone'
import {imageConfig} from '@app';
import Loc from '@loc';
import PictureItem from './PictureItem';
import {useMutation} from "@apollo/client";
import {UPLOAD_FILE} from '@mutations/file';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


export default (props) => {


    const [data, setData] = useState({
        dragEnter: false,
        max: 12
    });

    const [uploadFile] = useMutation(UPLOAD_FILE);


    const onDrop = (acceptedFiles => {

        let pictures = props.pictures;

        //переберемо всі файли в циклі і відсічемо картинки
        acceptedFiles.map((item, index) => {

            if (pictures.length < data.max) {
                item.preview = URL.createObjectURL(item);
                pictures.push(item);
            }

        });

        props.changePictures(pictures);

        pictures.map((item, index) => {
            if (!item.uploaded && !item.error)
                uploadPictureItem(item, index);

        });


    });


    const uploadPictureItem = async (file, index) => {

        const picture = props.pictures[index];

        await uploadFile({variables: {file: file}})
            .then(response => {

                picture.uploaded = true;

                picture.filename = response.data.uploadFile.filename + '?' + new Date().getTime();

                if (_.find(props.pictures, function (el) {
                    return el.isCover === true;
                }) === undefined)
                    picture.isCover = true;

                props.changePictures(picture, index)

            }).catch(error => {

                picture.error = true;

                props.changePictures(picture, index)

            });


    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: imageConfig.accept,
        onDrop
    });


    return (
        <div className="row mb-4">
            <div className="col-12">
                {props.pictures.length > 0 ?
                    <div className="row ml-0 mr-0">
                        {props.pictures.map((item, index) => (
                            <PictureItem
                                deletePicture={props.deletePicture}
                                changeCover={props.changeCover}
                                key={index}
                                item={item}
                                index={index}
                                link={((item.uploaded) ? item.filename : item.preview)}

                            />
                        ))}

                        {props.pictures.length < data.max &&
                        <div className={"col-6 col-sm-4 col-md-3 pl-1 pr-1"}>
                            <div className={'photos-dropzone-one  text-center'} {...getRootProps()}>
                                <input
                                    {...getInputProps()} />
                                <div
                                    className={'add-items-photo align-content-center align-items-center align-self-center d-flex justify-content-center photo-item'}>
                                    <CloudUploadIcon className={'image-preloader text-muted'}/>
                                    <span
                                        className={'items-left small'}>{Loc.app.left_items_photo} {data.max - props.pictures.length}</span>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                    :
                    <div className={'photos-dropzone pt-5 pb-5 text-center'} {...getRootProps()}>
                        <input
                            {...getInputProps()} />
                        <CloudUploadIcon className={'big-icon mb-2 text-muted'}/>
                        {
                            isDragActive ?
                                <div>{Loc.app.drop_here}</div> :

                                <div>{Loc.app.drag_here}</div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}





