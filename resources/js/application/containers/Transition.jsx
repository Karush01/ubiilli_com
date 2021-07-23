import React, {useState} from 'react';
import Slide from '@material-ui/core/Slide';

export default React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});





