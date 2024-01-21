const Home = () => {
  return (
    <>
      <div
        className="w-full h-screen bg-black
        text-9xl text-white
        flex justify-center items-center"
      >
        <img
          className="w-4/5 max-w-2xl
      animate-jump-in animate-duration-[2000ms] z-10"
          alt="logo"
          src="/src/assets/images/common/logo.png"
        />

        <img
          className="animate-fade animate-delay-[2000ms] 
        absolute h-screen w-full"
          alt="startBackground"
          src="/src/assets/images/common/startBackground.png"
        />
      </div>
    </>
  );
};

export default Home;
