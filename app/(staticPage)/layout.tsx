import NavBar from "../components/Navbar";
import Footer from "../components/Footer";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="bg-[#000000f5]">
            <NavBar />
                {children}
            <Footer />
        </div>
    )
}