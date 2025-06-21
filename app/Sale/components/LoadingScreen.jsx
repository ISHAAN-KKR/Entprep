export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="w-16 h-16 animate-bounce mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
          className="w-full h-full text-gray-800 dark:text-gray-200"
        >
          <path d="M505 19.5c-2.1-6.4-8.4-10.6-15.1-9.5-69.7 11.1-149.3 63.5-202.7 127.8-27.2 33.1-47.9 69.3-60.7 104.7l-97.6 17.5c-10.5 1.9-18.6 10-20.6 20.6L91 388.3l-58.2 58.2c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l58.2-58.2 104.5-17.4c10.5-1.7 18.5-9.9 20.4-20.4l17.5-97.6c35.4-12.8 71.6-33.5 104.7-60.7 64.3-53.4 116.7-133 127.8-202.7 1.1-6.6-3.1-13-9.5-15.1zM176 336c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32z" />
        </svg>
      </div>
      <p className="text-xl font-semibold animate-pulse">
        Building your entrepreneur quiz...
      </p>
    </div>
  );
}
