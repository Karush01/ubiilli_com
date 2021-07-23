import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import FilterListPreloader from './FilterListPreloader';


export default (props) => {

    return (
        <div>
            <div className="h6 font-weight-light">{props.title}</div>
            <List
                className={'filter-list'}
            >

                {props.loading ?
                    <FilterListPreloader/>
                    :
                    props.data.map((item, index) => (
                        <ListItem
                            key={index}
                            dense={true}
                            onClick={e => props.returnValue(props.field, item.id)}
                            button>
                            <ListItemIcon
                                style={{minWidth: 30}}
                            >
                                <Checkbox
                                    edge="start"
                                    value={item.id}
                                    checked={(props.params.includes(item.id))}
                                    className={'p-1 text-body'}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText className={'font-weight-light'} primary={item.description.name}/>
                        </ListItem>
                    ))}
            </List>
        </div>
    )

}





