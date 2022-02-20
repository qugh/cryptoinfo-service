import { ReactComponent as BitcoinLogo } from '../assets/images/bitcoin-btc-logo.svg'
import { ReactComponent as BNBLogo } from '../assets/images/bnb-bnb-logo.svg'
import { ReactComponent as ADALogo } from '../assets/images/cardano-ada-logo.svg'
import { ReactComponent as DogeLogo } from '../assets/images/dogecoin-doge-logo.svg'
import { ReactComponent as ETHLogo } from '../assets/images/ethereum-eth-logo.svg'
import { ReactComponent as DOTLogo } from '../assets/images/polkadot-new-dot-logo.svg'
import { ReactComponent as AAVELogo } from '../assets/images/aave.svg'
import { ReactComponent as ETCLogo } from '../assets/images/etc.svg'
import { ReactComponent as KSMLogo } from '../assets/images/ksm.svg'
import { ReactComponent as LTCLogo } from '../assets/images/ltc.svg'
import { ReactComponent as LUNALogo } from '../assets/images/luna.svg'
import { ReactComponent as MKRLogo } from '../assets/images/mkr.svg'
import { ReactComponent as NMRLogo } from '../assets/images/nmr.svg'
import { ReactComponent as SHIBLogo } from '../assets/images/shib.svg'
import { ReactComponent as SOLLogo } from '../assets/images/sol.svg'
import { ReactComponent as USDTLogo } from '../assets/images/usdt.svg'
import { ReactComponent as XMRLogo } from '../assets/images/xmr.svg'
import { ReactComponent as YFILogo } from '../assets/images/yfi.svg'

const logoCreator = (currency: string) => {
  switch (currency) {
    case 'BTC':
      return <BitcoinLogo />
    case 'BNB':
      return <BNBLogo />
    case 'ADA':
      return <ADALogo />
    case 'DOGE':
      return <DogeLogo />
    case 'DOT':
      return <DOTLogo />
    case 'ETH':
      return <ETHLogo />
    case 'AAVE':
      return <AAVELogo />
    case 'ETC':
      return <ETCLogo />
    case 'KSM':
      return <KSMLogo />
    case 'LTC':
      return <LTCLogo />
    case 'LUNA':
      return <LUNALogo />
    case 'MKR':
      return <MKRLogo />
    case 'NMR':
      return <NMRLogo />
    case 'SHIB':
      return <SHIBLogo />
    case 'SOL':
      return <SOLLogo />
    case 'USDT':
      return <USDTLogo />
    case 'XMR':
      return <XMRLogo />
    case 'YFI':
      return <YFILogo />
    default:
      return
  }
}

export default logoCreator
