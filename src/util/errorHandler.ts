const errorHandler = err => {
    const {graphQLErrors, networkError} = err;
    const isGraphQlError = graphQLErrors && graphQLErrors.length === 0;
    const errors = isGraphQlError && networkError ? networkError.result.errors : undefined;
    let errorMessage = '';

    if (errors){
        errors.map(({message = ""}) => {
            errorMessage +=  `${message}\n`
        });
    } else {
        errorMessage = err.message;
    }

    alert(errorMessage);
};

export default errorHandler;