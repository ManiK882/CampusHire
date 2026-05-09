function Footer() {
  return (
    <footer className="bg-blue-950 text-white mt-16 shadow-inner">

  <div className="max-w-7xl mx-auto px-6 py-5">

    <div className="flex flex-col md:flex-row items-center justify-between gap-3">

      {/* Left Section */}
      <h3 className="text-xl font-semibold tracking-wide">
        Placement Portal
      </h3>

      {/* Center Line */}
      <div className="hidden md:block h-6 w-px bg-gray-400"></div>

      {/* Copyright */}
      <p className="text-gray-300 text-sm md:text-base text-center">
        © 2026 Placement Portal | All Rights Reserved
      </p>

    </div>

  </div>

</footer>
  );
}

export default Footer;