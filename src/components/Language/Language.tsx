import React, { useState, useRef } from "react"
import { useFloating, offset, shift, FloatingPortal, arrow } from "@floating-ui/react";
import { motion, AnimatePresence } from "framer-motion"
import Popover from "../Popover/Popover";
const Language = () => {

    return (
        <Popover className="flex items-center py-1 hover:text-gray-300 cursor-pointer"
            renderPopover={<div className="bg-white relative shadow-md rounded-sm border-gray-200">
                <div className="flex flex-col py-2 pr-28 pl-3">
                    <button className="py-2 px-3 hover:text-orange">Tiếng Việt</button>
                    <button className="py-2 px-3 hover:text-orange ml">Tiếng Anh</button>
                </div>
            </div>}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00065 14.6667C11.6825 14.6667 14.6673 11.6819 14.6673 8.00004C14.6673 4.31814 11.6825 1.33337 8.00065 1.33337C4.31875 1.33337 1.33398 4.31814 1.33398 8.00004C1.33398 11.6819 4.31875 14.6667 8.00065 14.6667Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.33464 8.00004C5.33464 11.6819 6.52854 14.6667 8.0013 14.6667C9.47406 14.6667 10.668 11.6819 10.668 8.00004C10.668 4.31814 9.47406 1.33337 8.0013 1.33337C6.52854 1.33337 5.33464 4.31814 5.33464 8.00004Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1.33398 8H14.6673" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <span className="mx-1">Tiếng Việt</span>
            <svg viewBox="0 0 12 12" fill="none" width="12" height="12" color="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 8.146L11.146 3l.707.707-5.146 5.147a1 1 0 01-1.414 0L.146 3.707.854 3 6 8.146z" fill="currentColor"></path></svg>
        </Popover>

    )
};

export default Language;
