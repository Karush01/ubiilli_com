export const resolvers = {
    Mutation: {

        setAuth: (_root, {isAuthorized}, {cache}) => {

            cache.writeData({data: {isAuthorized}})
            return null;
        },


    }
};
