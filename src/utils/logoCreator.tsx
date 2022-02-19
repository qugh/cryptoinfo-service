import { ReactComponent as BitcoinLogo } from '../assets/images/bitcoin-btc-logo.svg'
import { ReactComponent as BNBLogo } from '../assets/images/bnb-bnb-logo.svg'
import { ReactComponent as ADALogo } from '../assets/images/cardano-ada-logo.svg'
import { ReactComponent as DogeLogo } from '../assets/images/dogecoin-doge-logo.svg'
import { ReactComponent as ETHLogo } from '../assets/images/ethereum-eth-logo.svg'
import { ReactComponent as DOTLogo } from '../assets/images/polkadot-new-dot-logo.svg'

const logoCreator = (currency:string) => {
    switch(currency){
        case 'BTC': {
            return <BitcoinLogo/>
        }
        case 'BNB' : {
            return <BNBLogo/>

        }
        case 'ADA': {
            return <ADALogo/>
        }
        case 'DOGE': {
            return <DogeLogo/>
        }
        case 'DOT':{
            return <DOTLogo/>
        }
        case 'ETH':{
            return <BNBLogo/>
        }
        default:
            return

    }
}

export default logoCreator