import maionLogo from '../components/pic/logo.png'

function Logo() {
    return (
        <div className='d-flex image p-4'>
            <img style={{ width: 250, height: 150, textAlign: "right" }} src={maionLogo} alt="logo" />
        </div>
    )
}

export default Logo