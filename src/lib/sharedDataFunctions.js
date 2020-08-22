export const handleListLoadMore = (dataProp, queryName, offsetName) => () => {
    // Don't call twice if already called handleListLoadMore
    // I was using awaitMore={props.data.networkStatus === 3} before in the list but for some reason it stops randomnly
    if (dataProp.networkStatus === 3) {
        return;
    }
    // The fetchMore method is used to load new data and add it
    // to the original query we used to populate the list
    dataProp.fetchMore({
        updateQuery: (previousResult, { fetchMoreResult }) => {
            // Don't do anything if there weren't any new items
            if (!fetchMoreResult || fetchMoreResult.bites.length === 0) {
                return previousResult;
            }
            return {
                ...previousResult,
                // Concatenate the new results after the old ones
                [queryName]: previousResult[queryName].concat(
                    fetchMoreResult[queryName],
                ),
            };
        },
        // Essentially we are calling the query again but offseting it by the number of bites we already have
        variables: { [offsetName]: dataProp[queryName].length },
    });
};
