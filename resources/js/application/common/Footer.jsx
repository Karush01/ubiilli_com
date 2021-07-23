import React from 'react';
import {Link} from "react-router-dom";
import Logo from "@components/Logo";
import Loc from '@loc';
import paths from '@paths';
import routes from '@routes';

export default (props) => {

    return (
        <footer className={'pt-4 pb-4'}>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-3 text-center text-md-left mb-4">
                        <Link className="navbar-brand m-0" to="/">
                            <div className={"d-inline-block"}>
                                <Logo inverse={true}/>
                            </div>
                        </Link>
                    </div>
                    <div className="col-12 col-md-9 text-right">
                        <div className="row justify-content-end m-0">
                            <div className="col-6 col-md-2 p-md-0 align-self-center mr-md-3">
                                <Link className="navbar-brand m-0 " to="/">
                                    <img className={'img-fluid'} src={'/' + paths.pictures + '/appStore.svg'}/>
                                </Link>
                            </div>
                            <div className="col-6 col-md-2  p-md-0  align-self-center">
                                <Link className="navbar-brand m-0" to="/">
                                    <img className={'img-fluid'} src={'/' + paths.pictures + '/gPlay.svg'}/>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mb-4">
                        <hr/>
                    </div>

                    <div className="col-12 col-md-4   mb-3">
                        <div className="h5 text-white mb-4">{Loc.app.rest_q}</div>
                        <span
                            className={'footer-link text-white cursor-pointer d-block position-relative'}>{Loc.app.reg_rest}</span>
                    </div>

                    <div className="col-12 col-md-4  mb-3">
                        <div className="h5 text-white mb-4">{Loc.app.footer_nav}</div>
                        <Link
                            className={'mb-3 text-capitalize footer-link text-white cursor-pointer d-block position-relative'}
                            to={'/' + routes.home}>{Loc.app.home}</Link>
                        <Link
                            className={'mb-3 text-capitalize footer-link text-white cursor-pointer d-block position-relative'}
                            to={'/' + routes.faq}>{Loc.app.faq}</Link>
                        {_sharedData.pages.map((item, index) => (
                            <Link
                                key={index}
                                className={'mb-3 text-capitalize footer-link text-white cursor-pointer d-block position-relative'}
                                to={'/' + item.slug}>{item.title}</Link>
                        ))}
                    </div>

                    <div className="col-12 col-md-4 mb-3">
                        <div className="h5 text-white mb-4">{Loc.app.footer_soc}</div>
                        {_sharedData.socials.map((item, index) => (
                            <a
                                className={'position-relative pl-4 text-capitalize footer-link text-white cursor-pointer d-block position-relative mb-3'}
                                key={index}
                                target={'_blank'}
                                href={item.link}>
                                <div className={'position-absolute u-social-icon u-icon-' + item.name}></div>
                                <span className={'ml-2 d-inline-block'}>{item.name}</span>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="row justify-content-center mt-4">
                    <div className="col-12 col-lg-9 text-center text-white font-weight-light">
                        <span className={'d-block mb-2'}>{Loc.app.copyright}</span>
                        <span className={'d-block small'}>{Loc.app.copy_desc}</span>
                    </div>
                </div>

            </div>
        </footer>
    )

}





