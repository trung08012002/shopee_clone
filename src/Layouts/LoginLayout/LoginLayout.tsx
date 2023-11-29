import React from "react"
import RegisterHeader from "../../components/RegisterHeader";
import Footer from "../../components/Footer";

interface Props {
    children?: React.ReactNode
}

const LoginLayout = ({ children }: Props) => {
    return (
        <div>
            <RegisterHeader />
            {children}
            <Footer />
        </div>
    )
};

export default LoginLayout;
