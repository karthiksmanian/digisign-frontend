import { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { auth } from '../../../context/firebase-config'
import { signOut } from "firebase/auth"
import { useRouter } from 'next/navigation';

interface Props {
  popUp: boolean;
  setPopUp: (show: boolean) => void;
}

const NavBar: React.FC<Props> = ({ popUp, setPopUp }) => {
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
    <div className="flex bg-gray-900">
      <NavigationMenu className="bg-gray-900 text-white">
        <NavigationMenuList>
          <NavigationMenuItem onClick={handleUploadPdf} className="mt-4 px-4 py-2 cursor-pointer">Add Pdf</NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <button onClick={handleLogOut} className="ml-auto mt-4 px-4 py-2 text-white cursor-pointer">Logout</button>
    </div>  
  );
}

export default NavBar;