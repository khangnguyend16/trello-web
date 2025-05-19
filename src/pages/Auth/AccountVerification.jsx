import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import PageLoadingSpinner from "~/components/Loading/PageLoadingSpinner";
import { verifyUserAPI } from "~/apis/index";

function AccountVerification() {
  // Lấy giá trị email và token từ URL
  let [searchParams] = useSearchParams();
  // const email = searchParams.get('email')
  // const token = searchParams.get('token')
  const { email, token } = Object.fromEntries([...searchParams]);

  // Tạo 1 biến state để biết dc là đã verify tài khoản thành công hay chưa
  const [verified, setVerified] = useState(false);

  // Gọi API để verify tài khoản
  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => setVerified(true));
    }
  }, [email, token]);

  // Nếu url có vấn đề, ko tồn tại 1 trong 2 giá trị email hoặc token thì đá ra 404
  if (!email || !token) {
    return <Navigate to="/404" />;
  }

  // Nếu chưa verify xong thì hiện loading
  if (!verified) {
    return <PageLoadingSpinner caption="Verifying your account..." />;
  }

  // Cuối cùng nếu ko gặp vấn đề gì + verify thành công thì điều hướng về trang login cùng giá trị verifiedEmail
  return <Navigate to={`/login?verifiedEmail=${email}`} />;
}

export default AccountVerification;
