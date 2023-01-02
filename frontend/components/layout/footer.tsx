import HelpIcon from '@mui/icons-material/Help';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import InfoIcon from '@mui/icons-material/Info';

const Footer = () => {
  return(
    <footer className="w-full">
      <div className="bg-slate-800 h-44 text-white flex justify-around py-4">
        <ul className="m-4 cursor-pointer">
          <li className="text-lg font-bold flex items-center">
            <HelpIcon fontSize="medium" style={{color: 'white'}} />
            <span className='ml-2'>Help</span>
          </li>
          <li>
            Track your parcel
          </li>
          <li>
            Delivery information
          </li>
          <li>
            Find the right size
          </li>          
          <li>
            Subscribe to out newsletter
          </li>
        </ul>

        <ul className="m-4 cursor-pointer">
          <li className="text-lg font-bold flex items-center">
            <CardGiftcardIcon fontSize="medium" style={{color: 'white'}} />
            <span className='ml-2'>Gift cards</span>
          </li>
          <li>
            Buy gift cards
          </li>
          <li>
            About gift cards and vouchers
          </li>
          <li>
            Redeem a gift card
          </li>          
          <li>
            Subsribe to newsletter
          </li>
        </ul>

        <ul className="m-4 cursor-pointer">
          <li className="text-lg font-bold flex items-center">
            <InfoIcon fontSize="medium" style={{color: 'white'}} />
            <span className='ml-2'>About us</span>
          </li>
          <li>
            WebShop careers
          </li>
          <li>
            Newsroom
          </li>
          <li>
            Marketing services
          </li>          
          <li>
            Learn more
          </li>
        </ul>

      </div>
    </footer>
  );
}

export default Footer