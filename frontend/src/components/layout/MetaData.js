import { Helmet } from 'react-helmet'

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{`${title} - Hatey Bazarey`}</title>
        </Helmet>
    )
}

export default MetaData