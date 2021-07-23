import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export default (props) => {

    const bigStar = 2;
    const allStars = 5;

    let result = [];

    //порахуємо цілі зірки
    for (let i = 0; i < Math.floor(props.rating / bigStar); i++)
        result.push(<StarIcon key={'star-' + i}/>);

    //порахуємо половинні зірки
    for (let i = 0; i < Math.floor(props.rating % bigStar); i++)
        result.push(<StarHalfIcon  key={'star-half-' + i} />);

    //порахуємо те, що залишилось
    for (let i = result.length; i < allStars; i++)
        result.push(<StarBorderIcon  key={'star-border-' + i} />);


    return (
        <div className="stars-rating d-inline-block">
            {result}
        </div>
    )

}





