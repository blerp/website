module.exports.project = () => {
    if (process.env.NODE_ENV === "production") {
        return "blerp-cf7ae";
    } else if (process.env.NODE_ENV === "staging") {
        return "blerp-staging-ac0d7";
    } else {
        throw new Error(
            "NODE_ENV not found: check serverless-config and make sure NODE_ENV variable is set",
        );
    }
};
