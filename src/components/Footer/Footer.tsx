
function Footer() {
  const date : Date = new Date();
  const Year = date.getFullYear();

  return (
    <div className="text-center py-8 bg-cyan-100">
      <p className="text-xl text-gray-600">
      Alok Suman &copy; {Year}. All Rights Reserved.
      </p>
    </div>
  );
}

export default Footer;
