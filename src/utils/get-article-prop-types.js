import PropTypes from "prop-types";

const getArticlePropTypes = () => ({
    author: PropTypes.shape({
            image: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
    }).isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    descriptionText: PropTypes.string.isRequired,
    favorited: PropTypes.bool.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    tagList: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    title: PropTypes.string.isRequired,
});

export default getArticlePropTypes;
