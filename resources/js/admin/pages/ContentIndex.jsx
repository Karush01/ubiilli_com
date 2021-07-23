import React, {useState, useEffect} from 'react';
import SpinLoader from '@componentsAdmin/SpinLoader';
import {GET_STATISTIC_DATA} from '@queriesAdmin/data';
import {useQuery} from "@apollo/client";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Loc from '@locAdmin';
import {Statistic} from 'antd';
import {GET_ACTIVE_CURRENCY} from "@storeAdmin/queries";

const ContentIndex = (props) => {

    const {data, loading, error} = useQuery(GET_STATISTIC_DATA);

    const {data: currency} = useQuery(GET_ACTIVE_CURRENCY);

    if (loading)
        return <SpinLoader/>;


    return (
        <div className="col-12">
            {!_.isUndefined(data) &&
            <div className="row">
                <div className="col-6 col-md-2 mb-3">
                    <Statistic className={'p-2 p-md-3 card-item h-100'}
                               title={Loc.admin.all_users}
                               value={data.getStatisticData.usersCount}/>
                </div>
                <div className="col-6 col-md-2 mb-3">
                    <Statistic className={'p-2 p-md-3 card-item h-100'}
                               title={Loc.admin.all_places}
                               value={data.getStatisticData.placesCount}/>
                </div>
                <div className="col-6 col-md-2 mb-3">
                    <Statistic className={'p-2 p-md-3 card-item h-100'}
                               title={Loc.admin.success_reserves}
                               value={data.getStatisticData.reserves.successedReserves}/>
                </div>
                <div className="col-6 col-md-2 mb-3">
                    <Statistic className={'p-2 p-md-3 card-item h-100'}
                               title={Loc.admin.canceled_reserves}
                               value={data.getStatisticData.reserves.canceledReservers}/>
                </div>
                <div className="col-6 col-md-2 mb-3">
                    <Statistic className={'p-2 p-md-3 card-item h-100'}
                               title={Loc.admin.success_deliveries}
                               value={data.getStatisticData.reserves.successedDeliveries}/>
                </div>
                <div className="col-6 col-md-2 mb-3">
                    <Statistic className={'p-2 p-md-3 card-item h-100'}
                               title={Loc.admin.canceled_deliveries}
                               value={data.getStatisticData.reserves.canceledDeliveries}/>
                </div>
                <div className="col-12 mt-4 mb-4">
                    <HighchartsReact highcharts={Highcharts} options={{
                        chart: {type: 'column'},
                        title: {text: Loc.admin.graph_title},
                        xAxis: {type: 'category'},
                        credits: {
                            enabled: false
                        },
                        yAxis: {
                            min: 0,
                            title: {text: Loc.admin.sum + ' (' + currency.activeCurrency.code + ')'}
                        },
                        plotOptions: {
                            series: {
                                borderWidth: 0,
                                dataLabels: {
                                    enabled: true,
                                    format: currency.activeCurrency.code + '{point.y:.2f}'
                                }
                            }
                        },
                        tooltip: {
                            pointFormat: '<span>' + Loc.admin.sum + '</span>: <b>' + currency.activeCurrency.code + '{point.y:.2f}</b>'
                        },
                        legend: {enabled: false},
                        series: [{
                            name: Loc.admin.income,
                            data: data.getStatisticData.dynamic,
                            dataLabels: {enabled: true}
                        }]
                    }}/>
                </div>

            </div>
            }
        </div>
    )

}

export default ContentIndex;


