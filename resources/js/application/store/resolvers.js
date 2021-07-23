import {GET_META} from './queries';

export const resolvers = {
    Mutation: {

        setAuth: (_root, {isAuthorized}, {cache}) => {

            cache.writeData({data: {isAuthorized}});
            return null;
        },

        setActiveCity: (_root, {activeCity}, {cache}) => {

            cache.writeData({data: {activeCity}});
            return null;
        },

        setMeta: (_root, {meta}, {cache}) => {

            meta.__typename = cache.readQuery({query: GET_META}).meta.__typename;

            const data = {meta: meta};

            cache.writeData({data});

            return null;


        },

    }
};
