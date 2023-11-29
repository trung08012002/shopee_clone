
import React, { useState, useRef, useId, ElementType } from "react"
import { useFloating, offset, shift, FloatingPortal, arrow, type Placement } from "@floating-ui/react";
import { motion, AnimatePresence } from "framer-motion"
interface Props {
    children: React.ReactNode,
    renderPopover: React.ReactNode,
    className?: string,
    as?: ElementType,
    initialOpen?: boolean,
    placement?: Placement
}
const Popover = ({ children, className, renderPopover, as: Element = 'div', initialOpen, placement = 'bottom' }: Props) => {
    const [isOpen, setIsOpen] = useState(initialOpen || false);
    const arrowRef = useRef<HTMLElement>(null);
    const id = useId();
    const { refs, strategy, middlewareData, x, y } = useFloating({

        open: isOpen,
        onOpenChange: setIsOpen,
        placement: placement,
        middleware: [
            shift(), offset(6), arrow(
                {
                    element: arrowRef
                })],

    });
    const handleOnMouseEnter = () => {
        setIsOpen(true);
    }
    const handleOnMouseLeave = () => {
        setIsOpen(false);
    }
    return (
        <Element ref={refs.setReference} className={className} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
            {children}
            {
                isOpen && (
                    <FloatingPortal id={id}>
                        <AnimatePresence>
                            <motion.div ref={refs.setFloating}
                                style={{
                                    position: strategy,
                                    left: x ?? 0,
                                    top: y ?? 0,
                                    width: 'max-content',
                                    transform: `${middlewareData.arrow?.x}px top`,
                                }}
                                initial={{ opacity: 0, transform: "scale(0)" }}
                                animate={{ opacity: 1, transform: "scale(1)" }}
                                exit={{ opacity: 0, transform: "scale(0)" }}
                                transition={{ duration: 0.2 }}
                            >
                                <span
                                    ref={arrowRef}
                                    style={{
                                        position: strategy,
                                        left: middlewareData.arrow?.x,
                                        top: middlewareData.arrow?.y,
                                    }}
                                    className="border-x-transparent z-50 translate-y-[-99%] border-t-transparent border-b-white border-[11px] "
                                />
                                {renderPopover}</motion.div>
                        </AnimatePresence>

                    </FloatingPortal>)
            }
        </Element>
    )
};

export default Popover;
