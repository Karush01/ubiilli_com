import React from 'react';
import Preloader from './Preloader';
import {useQuery} from "@apollo/client";
import {GET_FAQS} from '@queries/faq';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default (props) => {

    const {data, error, loading} = useQuery(GET_FAQS);

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-10">
                {loading ?
                    <Preloader/>
                    :
                    <div className="row">
                        <div className="col-12">
                            {data.getFaqs.map((item, index) => (
                                <Accordion
                                    className={'faq-item mb-3 mt-3 pt-2 pb-2'}
                                    key={index}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                    >
                                        <Typography>{item.question}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography
                                            paragraph={true}
                                            className={'font-weight-light'}>
                                            {item.answer}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    )

}





