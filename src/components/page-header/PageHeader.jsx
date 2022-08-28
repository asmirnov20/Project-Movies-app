import background from '../../assets/footer-bg.jpg'

import './PageHeader.scss'

const PageHeader = ({ children }) => {
    return (
        <div className='page-header' style={{ backgroundImage: `url(${background})` }}>
            {children}
        </div>
    )
}

export default PageHeader