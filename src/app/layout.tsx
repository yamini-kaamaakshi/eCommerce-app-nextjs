import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
    title: "eCommerce App",
    description: "A simple eCommerce application built with Next.js 15",
};

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
        <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto p-4">{children}</main>
        <Footer />
        </body>
        </html>
    );
};

export default Layout;
