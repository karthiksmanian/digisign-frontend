import { Tabs } from "./ui/Tabs"
import { NavBar } from "./ui/NavBar"
import { tabOptions } from "./constants/tab.constants"
import { NavBarOptions } from "./constants/nav.constants"
import React from "react"
import { TableComponent } from "./ui/Table"

export default function Attachments(){
    const [selectedTab,setSelectedTab]=React.useState<{icon:any,title:string}>(tabOptions[0])
    const [selectedNavBar,setSelectedNavBar]=React.useState(NavBarOptions[0])
    const tabClick=(option:any)=>{
        setSelectedTab(option)
    }
    const navBarClick=(option:any)=>{
        setSelectedNavBar(option)
    }
    return (<div className="w-full h-full p-[20px] flex flex-col gap-y-[20px]">
                <NavBar options={NavBarOptions} onclick={navBarClick} selectedOption={selectedTab}/>
                <Tabs options={tabOptions} onclick={tabClick} selectedTab={selectedTab}>
                    <TableComponent/>
                </Tabs>
            </div>)
}