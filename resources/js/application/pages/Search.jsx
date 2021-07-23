import React, {useState, useEffect} from 'react';
import FindForm from '@modules/FindForm';
import Title from '@containers/Title';
import HeaderForm from '@containers/HeaderForm';
import routes from '@routes';
import Loc from '@loc';
import Divider from '@material-ui/core/Divider';
import FilterGroup from '@modules/Filters/FilterGroup';
import FilterList from '@modules/Filters/FilterList';
import PlacesList from '@modules/PlacesList';
import Delivery from '@modules/Filters/Delivery';
import SortedBlock from '@modules/Filters/SortedBlock';
import {GET_KITCHENS} from '@queries/kitchen';
import {GET_OPTIONS} from '@queries/option';
import {GET_TYPES} from '@queries/type';
import {GET_SEARCH_PLACES} from '@queries/place';
import {useQuery} from "@apollo/client";
import {filterObject} from '@hooks/helperHooks';
import omitEmpty from 'omit-empty';
import qs from 'qs';
import Pagination from '@material-ui/lab/Pagination';
import {goToTop} from "react-scrollable-anchor";
import {fetchingData} from '@app';
import {Redirect} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import FilterListIcon from '@material-ui/icons/FilterList';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

const initialState = {
    delivery: null,
    kitchens: [],
    options: [],
    types: [],
    cityId: null,
    q: undefined,
    sort: null,
    page: 1,
    geo: {
        latitude: null,
        longitude: null
    }
}

export default (props) => {

    const page = 'page';

    const newInit = {...initialState};

    const [params, setParams] = useState(newInit);

    useEffect(() => {
        setParams({...filterObject(window.location.search, params)});
    }, []);

    const {loading: kitchensLoading, error: kitchensError, data: kitchensData} = useQuery(GET_KITCHENS);

    const {loading: typesLoading, error: typesError, data: typesData} = useQuery(GET_TYPES);

    const {loading: optionsLoading, error: optionsError, data: optionsData} = useQuery(GET_OPTIONS);

    const {data: dataItems, error: errorItems, loading: loadingItems} = useQuery(GET_SEARCH_PLACES, {
        variables: {
            cityId: params.cityId,
            delivery: !!params.delivery,
            latitude: params.geo.latitude,
            longitude: params.geo.longitude,
            kitchens: [...params.kitchens],
            options: [...params.options],
            types: [...params.types],
            q: params.q,
            sort: params.sort,
            page: params.page,
        },
        fetchPolicy: fetchingData.noCache
    });

    const changeSelectValue = async (field, value) => {

        let filters = {...params};

        if (filters[field].includes(value))
            filters[field].splice(filters[field].indexOf(value), 1);
        else
            filters[field].push(value);

        //скинемо сторінку
        filters[page] = initialState[page];

        await setParams(filters);

        search(filters);
    }

    const changeFilter = async (field, value, resetField = null) => {

        let filters = {...params};

        if (!_.isNull(resetField))
            filters[resetField] = initialState[resetField];

        //якщо сторінка не переключена то скинемо її
        if (field != page)
            filters[page] = initialState[page];

        filters[field] = value;

        await setParams(filters);

        search(filters);
    }

    const search = (paramsData) => {

        history.pushState({}, document.title, '?' + decodeURIComponent(qs.stringify(omitEmpty(paramsData))));

    };

    const changePage = (e, number) => {

        goToTop();

        changeFilter(page, number)

    };

    const [openFilter, setOpenFilter] = useState(false);

    if (!loadingItems && dataItems.searchPlaces.itemsCount == null)
        return <Redirect to={routes.home}/>;

    return (
        <section>
            <HeaderForm>
                <FindForm
                    changeFilter={changeFilter}
                    params={params}
                />
            </HeaderForm>
            <div className="container pt-4 pb-4">
                <div className="row">
                    <div className="col-12">
                        <div className="h4">
                            <Title
                                slug={routes.search}
                                title={Loc.app.search_rest}
                            />
                        </div>
                    </div>
                </div>
                <div className="row mt-3 mb-3 flex-md-row-reverse">
                    <div className="col-12 col-md-3 offset-md-4 text-md-right">
                        <SortedBlock
                            sort={params.sort}
                            returnValue={changeFilter}
                        />
                    </div>
                    <div className="col-12 col-md-5 font-weight-light align-self-center">
                        <span>{Loc.app.finded} {loadingItems ? 0 : dataItems.searchPlaces.itemsCount.itemsCount} {Loc.app.search_restaurants}</span>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12">
                        <Divider/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-3 d-none d-md-inline-block">
                        <FilterGroup>
                            <Delivery
                                value={params.delivery}
                                returnValue={changeFilter}
                            />
                        </FilterGroup>
                        <FilterGroup>
                            <FilterList
                                field={'types'}
                                loading={typesLoading}
                                data={!typesLoading ? typesData.getTypes : []}
                                title={Loc.app.rest_type}
                                params={params.types}
                                returnValue={changeSelectValue}
                            />
                        </FilterGroup>
                        <FilterGroup>
                            <FilterList
                                field={'kitchens'}
                                loading={kitchensLoading}
                                data={!kitchensLoading ? kitchensData.getKitchens : []}
                                title={Loc.app.kitchens}
                                params={params.kitchens}
                                returnValue={changeSelectValue}
                            />
                        </FilterGroup>
                        <FilterGroup>
                            <FilterList
                                field={'options'}
                                loading={optionsLoading}
                                data={!optionsLoading ? optionsData.getOptions : []}
                                title={Loc.app.options}
                                params={params.options}
                                returnValue={changeSelectValue}
                            />
                        </FilterGroup>
                    </div>
                    <div className="col-12 col-md-9">
                        <PlacesList
                            loading={loadingItems}
                            dataItems={dataItems}
                        />
                        {!loadingItems && dataItems.searchPlaces.itemsCount.total > 1 &&
                        <div className="mt-3 mb-3">
                            <div className={'text-center '}>
                                <Pagination
                                    size={'large'}
                                    onChange={changePage}
                                    page={dataItems.searchPlaces.itemsCount.currentPage}
                                    count={dataItems.searchPlaces.itemsCount.total}
                                    shape="rounded"/>
                            </div>
                        </div>
                        }
                    </div>
                </div>

            </div>

            <SwipeableDrawer
                className={'w-100 filter-drawer'}
                anchor={'left'}
                open={openFilter}
                onClose={e => setOpenFilter(false)}
                onOpen={e => setOpenFilter(true)}
            >
                <div className={'container'}>

                    <div className="pt-2 text-right close-filter-button">
                        <IconButton
                            onClick={e => setOpenFilter(false)}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </div>

                    <div className="row pt-5 mt-4 pb-5">
                        <div className="col-12">
                            <FilterGroup>
                                <Delivery
                                    value={params.delivery}
                                    returnValue={changeFilter}
                                />
                            </FilterGroup>

                            <FilterGroup>
                                <FilterList
                                    field={'types'}
                                    loading={typesLoading}
                                    data={!typesLoading ? typesData.getTypes : []}
                                    title={Loc.app.rest_type}
                                    params={params.types}
                                    returnValue={changeSelectValue}
                                />
                            </FilterGroup>

                            <FilterGroup>
                                <FilterList
                                    field={'kitchens'}
                                    loading={kitchensLoading}
                                    data={!kitchensLoading ? kitchensData.getKitchens : []}
                                    title={Loc.app.kitchens}
                                    params={params.kitchens}
                                    returnValue={changeSelectValue}
                                />
                            </FilterGroup>
                            <FilterGroup>
                                <FilterList
                                    field={'options'}
                                    loading={optionsLoading}
                                    data={!optionsLoading ? optionsData.getOptions : []}
                                    title={Loc.app.options}
                                    params={params.options}
                                    returnValue={changeSelectValue}
                                />
                            </FilterGroup>
                        </div>
                    </div>

                    <Button
                        onClick={e => setOpenFilter(false)}
                        variant="contained"
                        className={'filter-action-button primary '}>
                        {Loc.app.show} ({loadingItems ? 0 : dataItems.searchPlaces.itemsCount.itemsCount})
                    </Button>

                </div>
            </SwipeableDrawer>

            <Fab
                onClick={e => setOpenFilter(e)}
                className={'filter-button d-md-none'}>
                <FilterListIcon/>
            </Fab>
        </section>
    )

}





