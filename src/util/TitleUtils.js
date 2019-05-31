const setTitle = (title = null, next) => {
    if (title === null) {
        document.title = 'wjbaker.com';
    }
    else {
        document.title = `${title} | wjbaker.com`;
    }

    next();
}

export default {
    setTitle,
}