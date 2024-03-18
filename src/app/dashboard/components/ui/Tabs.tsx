// 'use client'
import React from "react"

interface TabProps{
    options:{
        icon?:any
        title:string
    }[]
    onclick:(option:any)=>void
    selectedTab:{
        icon?:any
        title:string
    }
    children?:React.ReactNode
}
export const Tabs:React.FC<TabProps>=({options,onclick,selectedTab,children})=>{
    return(
        <div className="md:flex">
            <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                {options.map((option:any)=>{
                    return(<li key={option.title} onClick={()=>onclick(option)}>
                        <a  className={`inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full ${selectedTab.title===option.title?'dark:bg-blue-600':'over:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'}`} aria-current="page">
                            {option.icon}
                            {option.title}
                        </a>
                    </li>)
                })}
            </ul>
            <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                {children}
            </div>
        </div>
    )
}