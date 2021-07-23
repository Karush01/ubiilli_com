import React from 'react';
import List from '@material-ui/core/List';
import Loc from '@loc';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default (props) => {

    const menu = Loc.app.account_menu;

    return (
        <div className="container h-100">
            <div className="pt-2 text-right mr-n2">
                <IconButton onClick={e => props.onClose(false)}>
                    <CloseIcon/>
                </IconButton>
            </div>
            <div className={'pt-2 pb-4'}>
                <div className={"m-auto d-block position-relative u-icon u-icon-account-circle"}/>
            </div>
            <div
                className="h5 text-center mb-3 mx-auto user-info-name">{!_.isUndefined(props.user) && props.user.first_name + ' ' + props.user.last_name}</div>
            <div className="row pb-5 scrolled-block ">
                <div className="col-12 pl-0 pr-0 pb-5">
                    <List className={'account-list-item lst '}>
                        {Object.keys(props.tabs).map((tab, index) => (
                            (props.tabs[tab].menu && props.tabs[tab].roles.includes(props.user.user_type_id)) &&
                            <ListItem
                                key={index}
                                onClick={e => props.activeTabHandler(props.tabs[tab].label)}
                                className={'pt-3 pb-3 ' + (!_.isUndefined(props.activeTab) && props.tabs[props.activeTab].label == props.tabs[tab].label ? ' active-list-item' : '')}
                                button>
                                <ListItemIcon className={'icon-secondary'}>{props.tabs[tab].icon}</ListItemIcon>
                                <ListItemText className={'font-weight-light'} primary={props.tabs[tab].title}/>
                            </ListItem>
                        ))}
                    </List>

                    <Divider/>
                    <List
                        onClick={e => props.logout(e)}
                        className={'account-list-item'}>
                        <ListItem className={'pt-3 pb-3'} button>
                            <ListItemIcon><ExitToAppIcon className={'icon-secondary'}/></ListItemIcon>
                            <ListItemText className={'font-weight-light'} primary={menu.logout}/>
                        </ListItem>
                    </List>
                </div>
            </div>
        </div>
    )

}





