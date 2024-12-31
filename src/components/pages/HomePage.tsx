const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
        Welcome to the Item Management App
      </h1>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 text-center max-w-md">
        Manage your items efficiently and explore OpenAI prompts.
      </p>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center max-w-md">
        Use the navigation bar above to get started!
      </p>
    </div>
  );
};

export default HomePage;
