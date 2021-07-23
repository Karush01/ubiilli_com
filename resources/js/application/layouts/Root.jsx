import React, {Component} from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';
import Header from '@common/Header';
import Head from '@common/Head';
import Footer from '@common/Footer';
import Auth from '@modules/Auth';
import {SnackbarProvider} from 'notistack';
import {notification} from '@app';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ContentIndex from '@pages/ContentIndex';
import NotFound from '@pages/NotFound';
import Faq from '@pages/Faq';
import Search from '@pages/Search';
import Place from '@pages/Place';
import routes from '@routes';
import StaticPage from "@pages/StaticPage";
import Cart from "@pages/Cart";

const initialState = {
    openAuth: false,
    userType: _sharedData.userTypes.user
};

class Root extends Component {

    constructor(props) {
        super(props);

        this.state = initialState;

        this.snack = React.createRef();

    }


    handleClickOpen(userType, e) {

        this.setState({
            openAuth: true,
            userType: _.isInteger(userType) ? userType : initialState.userType
        });
    };

    handleClose() {
        this.setState(initialState);
    };

    onClickDismiss(key) {
        this.snack.current.closeSnackbar(key);
    }


    render() {

        return (
            <BrowserRouter>
                <ScrollToTop>
                    <SnackbarProvider
                        ref={this.snack}
                        action={(key) => (
                            <IconButton
                                className={'text-white'}
                                onClick={e => this.onClickDismiss(key, e)}
                            >
                                <CloseIcon/>
                            </IconButton>
                        )}
                        anchorOrigin={notification.anchorOrigin}
                        maxSnack={notification.maxSnack}>
                        <Head/>
                        <Header
                            handleClickOpen={e => this.handleClickOpen(e)}
                        />

                        <div className="all-data"> 
  
                            <Switch>
                                <Route path={'/'}
                                       exact
                                       render={(props) => (
                                           <ContentIndex {...props} openAuth={e => this.handleClickOpen(e)}/>
                                       )}
                                />
                                <Route path={'/' + routes.faq} component={Faq}/>
                                <Route path={'/' + routes.search} component={Search}/>
                                <Route path={'/' + routes.cart.index + '/:slug'} component={Cart}/>
                                <Route path={'/' + routes.place + '/:slug'}
                                       render={(props) => (
                                           <Place {...props}
                                                  openAuth={e => this.handleClickOpen(e)}/>
                                       )}/>
                                <Route path={'/' + routes.hashedPlace + '/:slug'}
                                       render={(props) => (
                                           <Place {...props}
                                                  openAuth={e => this.handleClickOpen(e)}/>
                                       )}/>
                                <Route path={'/:slug'} component={StaticPage}/>
                                <Route component={NotFound}/>
                            </Switch>

                            <Auth
                                userType={this.state.userType}
                                handleClickClose={e => this.handleClose(e)}
                                open={this.state.openAuth}/>

                        </div>
                        <Footer/>
                    </SnackbarProvider>
                </ScrollToTop>
            </BrowserRouter>
        )

    }
}

export default Root;


