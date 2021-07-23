import React from 'react';
import Loc from '@loc';
import FindForm from '@modules/FindForm';


export default (props) => {

    return (
        <section
            className="align-content-center align-items-center cover d-flex fullscreen justify-content-center main-image-bg">
            <div className="main-section w-100">
                <div className="row m-auto ml-0 mr-0 justify-content-center">
                    <div className="col-xl-6 col-lg-7 col-md-9 col-sm-10 col-12 text-center">
                        <div className="h1 text-left text-white">
                            {Loc.app.order_food}
                        </div>
                        <FindForm
                            showHelpers={true}
                        />
                    </div>

                </div>

            </div>
        </section>
    )

}





