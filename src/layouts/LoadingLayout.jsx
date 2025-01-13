import { Triangle } from "react-loader-spinner";

const LoadingLayout = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-5">
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#000000"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default LoadingLayout;
