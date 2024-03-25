import icon from '../../favicon.ico'
import { auth } from '../../../context/firebase-config'
import { signOut } from "firebase/auth"
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Props {
  popUp: boolean;
  setPopUp: (show: boolean) => void;
  email: string;
}

const NavBar: React.FC<Props> = ({ popUp, setPopUp, email }) => {
  const router = useRouter();

  const handleLogOut = async () => {
    await signOut(auth)
    localStorage.setItem('user', '')
    router.push('/auth')
  }

  const handleUploadPdf = () => {
    setPopUp(!popUp);
  }

  return (
    <nav className="border-gray-200 bg-gray-900 ">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src={icon} className="h-8 w-8" alt="DigiSign" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">DigiSign</span>
        </a>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>

        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <a onClick={handleUploadPdf} className="block py-2 px-3 rounded text-white text-md cursor-pointer">Upload pdf</a>
            </li>
            <li>
              <a onClick={handleLogOut} className="block py-2 px-3 text-md rounded text-white cursor-pointer">Logout</a>
            </li>
            <li className='flex items-center'>
              <div className='flex text-white text-sm items-center justify-center bg-green-900 rounded-full h-8 w-8 cursor-pointer'>
                {email?.at(0)?.toUpperCase()}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;  