const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4 md:px-8 text-center">
                <p className="text-gray-400 text-sm">
                    © {new Date().getFullYear()} Shivali Gaur. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
