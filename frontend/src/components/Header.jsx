const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg py-4 px-6 flex justify-between items-center backdrop-blur-sm">
   
      <h1 className="text-2xl sm:text-3xl font-bold tracking-wide drop-shadow-md">
        Task Management System
      </h1>

 
      <div className="hidden sm:block text-sm font-medium text-white/90">
        Empowering Teams & Productivity 🚀
      </div>
    </header>
  );
};

export default Header;
