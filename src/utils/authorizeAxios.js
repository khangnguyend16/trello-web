import axios from "axios";
import { toast } from "react-toastify";
import { interceptorLoadingElements } from "~/utils/formatters";
import { refreshTokenAPI } from "~/apis";
import { logoutUserAPI } from "~/redux/user/userSlice";

// Inject store
let axiosReduxStore;
export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore;
};

// Khởi tạo 1 đối tượng Axios (authorizedAxiosInstance) mục đích để custom và cấu hình chung cho dự án
let authorizedAxiosInstance = axios.create();

// Thời gian chờ tối đa của 1 request: để 10p
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10;

// withCredentials: Sẽ cho phép axios tự động gửi cookie trong mỗi request lên BE (phục vụ việc lưu JWT tokens (refresh & access) vào trong httpOnly Cookie của trình duyệt)
authorizedAxiosInstance.defaults.withCredentials = true;

export default authorizedAxiosInstance;

// Cấu hình interceptors (Bộ đánh chặn vào giữa mọi Request và Response)
// Interceptor Request: Can thiệp vào giữa những request API
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    // Kỹ thuật chặn spam click
    interceptorLoadingElements(true);

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Khởi tạo 1 promise cho việc gọi api refresh_token
// Mục đích tạo promise này để khi nào gọi api refresh_token xong thì mới retry lại nhiều api bị lỗi trước đó
let refreshTokenPromise = null;

// Interceptor Response: Can thiệp vào giữa những reponse nhận về
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger

    // Kỹ thuật chặn spam click
    interceptorLoadingElements(false);

    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger

    // Kỹ thuật chặn spam click
    interceptorLoadingElements(false);

    // Trường hợp 1: Nếu như nhận 401 từ BE, gọi api đăng xuất
    if (error.response?.status === 401) {
      axiosReduxStore.dispatch(logoutUserAPI(false));
    }

    // Trường hợp 2: Nếu nhận mã 410 từ BE, thì sẽ gọi api refresh token để làm mới lại accessToken
    // Đầu tiên lấy dc các request API đang bị lỗi thông qua error.config
    const originalRequests = error.config;
    console.log("originalRequests: ", originalRequests);
    if (error.response?.status === 410 && !originalRequests._retry) {
      originalRequests._retry = true;

      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then((data) => {
            // đồng thời accessToken đã nằm trong httpOnly cookie (xử lý phía BE)
            return data?.accessToken;
          })
          .catch((_error) => {
            // Nếu nhận bất kỳ lỗi nào từ api refresh token -> logout luôn
            axiosReduxStore.dispatch(logoutUserAPI(false));
            return Promise.reject(_error);
          })
          .finally(() => {
            // Dù API có ok hay lỗi thì vẫn luôn gán lại refreshTokenPromise về null như ban đầu
            refreshTokenPromise = null;
          });
      }

      // eslint-disable-next-line no-unused-vars
      return refreshTokenPromise.then((accessToken) => {
        return authorizedAxiosInstance(originalRequests);
      });
    }

    // Xử lý tập trung phần hiển thị thông báo lỗi trả về từ mọi API ở đây
    let errorMessage = error?.message;
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message;
    }
    // Dùng toastify để hiển thị bất kể mọi mã lỗi lên màn hình - Ngoại từ mã 410 - GONE phục vụ việc tự động refresh lại token
    if (error.response?.status !== 410) {
      toast.error(errorMessage);
    }
    return Promise.reject(error);
  }
);
