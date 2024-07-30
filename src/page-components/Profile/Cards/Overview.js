import { useAuth } from '@/controllers/auth.controller';

const Overview = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="dark:bg-gray-400 bg-white p-6 shadow-[0px_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-2xl font-[sans-serif] overflow-hidden mx-auto mt-4">
      <div className="flex flex-col items-center">
        <div className="min-h-[110px]">
          <img src='https://readymadeui.com/team-1.webp' className="rounded-full w-28 h-28" alt="User Avatar" />
        </div>
        <div className="mt-4 text-center">
          <p className="text-lg font-bold text-gray-800">{currentUser.username}</p>
          <p className="text-sm text-gray-600">{currentUser.email}</p>
        
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8 mt-8">
        <div className="flex items-center justify-center p-3 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 w-11 h-11">
          <svg xmlns="http://www.w3.org/2000/svg" width="26px" viewBox="0 0 512 512">
            <path fillRule="evenodd"
              d="M256.612 13.686C119.557 13.686 8.2 124.223 8.2 261.489c0 137.259 111.357 247.796 248.412 247.796S503.8 398.747 503.8 261.489c0-137.266-110.133-247.803-247.188-247.803zm19.579 314.61c-18.355-1.217-25.698-10.93-40.382-19.435-7.342 41.296-17.132 80.165-45.277 100.817-8.566-61.948 12.237-108.104 22.027-157.91-17.132-27.938 2.447-86.242 37.934-71.668 44.054 17.008-37.934 106.894 17.132 117.824 58.738 12.148 81.988-100.816 46.501-137.259-52.62-52.233-151.74-1.216-139.502 74.095 3.67 18.225 22.027 24.295 8.566 49.807-34.264-7.287-44.054-34.016-42.83-68.025 2.447-57.093 51.395-97.18 101.567-103.25 62.409-7.287 121.147 23.078 128.489 81.382 9.79 66.815-28.145 138.483-94.225 133.622z"
              data-original="#000000" />
          </svg>
        </div>
        <div className="flex items-center justify-center p-3 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 w-11 h-11">
          <svg xmlns="http://www.w3.org/2000/svg" width="26px" viewBox="0 0 512 512">
            <path d="M301 256c0 24.852-20.148 45-45 45s-45-20.148-45-45 20.148-45 45-45 45 20.148 45 45zm0 0"
              data-original="#000000" />
            <path
              d="M332 120H180c-33.086 0-60 26.914-60 60v152c0 33.086 26.914 60 60 60h152c33.086 0 60-26.914 60-60V180c0-33.086-26.914-60-60-60zm-76 211c-41.355 0-75-33.645-75-75s33.645-75 75-75 75 33.645 75 75-33.645 75-75 75zm86-146c-8.285 0-15-6.715-15-15s6.715-15 15-15 15 6.715 15 15-6.715 15-15 15zm0 0"
              data-original="#000000" />
            <path
              d="M377 0H135C60.562 0 0 60.563 0 135v242c0 74.438 60.563 135 135 135h242c74.438 0 135-60.563 135-135V135C512 60.562 451.437 0 377 0zm45 332c0 49.625-40.375 90-90 90H180c-49.625 0-90-40.375-90-90V180c0-49.625 40.375-90 90-90h152c49.625 0 90 40.375 90 90zm0 0"
              data-original="#000000" />
          </svg>
        </div>
        <div className="flex items-center justify-center p-3 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 w-11 h-11">
          <svg xmlns="http://www.w3.org/2000/svg" width="26px" viewBox="0 0 512 512">
            <path fill="#333"
              d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"
              data-original="#03a9f4" />
          </svg>
        </div>
        <div className="flex items-center justify-center p-3 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 w-11 h-11">
          <svg xmlns="http://www.w3.org/2000/svg" width="26px" viewBox="0 0 682.667 682.667">
            <path
              d="M604.672 0H35.297C15.8.012-.003 15.824 0 35.328v569.375C.012 624.2 15.824 640.003 35.328 640h306.547V392.5H258.75v-96.875h83.125v-71.293c0-82.676 50.473-127.676 124.223-127.676 35.324 0 65.68 2.633 74.527 3.809v86.41H489.77c-40.125 0-47.895 19.066-47.895 47.05v61.7h95.938l-12.5 96.875h-83.438V640h162.797c19.508.004 35.324-15.805 35.328-35.313V35.298C639.992 15.8 624.176-.003 604.672 0zm0 0"
              data-original="#000000" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Overview;
