const Footer = () => {
  return (
    <footer className="bg-brand-blue shadow-inner">
      <div className="container mx-auto py-4 px-4 text-center text-white">
        <p>&copy; {new Date().getFullYear()} Pinoy Crim Reviewer. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
