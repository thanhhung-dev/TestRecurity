"use client";
import React, { useState } from "react";
import { createStyles } from "antd-style";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Typography,
  Divider,
  App,
  Alert,
} from "antd";
import FacebookIcon from "@/access/icons/facebook.svg";
import GoogleIcon from "@/access/icons/google.svg";
import { useAuth } from "@/context/AuthContext";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { STATS_DATA, statsIcons } from "@/const/register.const";
import { ArrowRight, ChevronLeft,} from "lucide-react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"; 
import Link from "next/link";
const { Title, Text } = Typography;

const LoginSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const useStyles = createStyles(({ css }) => ({
  container: css`
    width: 100%;
    height: 100vh;
    background: #ffffff;
    position: relative;
    overflow: hidden;
  `,

  row: css`
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    display: flex;
  `,

  diagonalDivider: css`
    position: absolute;
    left: 50%; /* ← Căn giữa */
    top: 50%; /* ← Căn giữa dọc */
    height: 200vh; /* ← Đủ cao để che */
    width: 8%;
    transform: translate(-85%, -50%) rotate(2deg); /* ← Xoay 2 độ */
    background: linear-gradient(
      to right,
      transparent 0%,
      #fff 0%,
      #fff 100%,
      #fff 100% /* ← Phải trong suốt */
    );
    z-index: 1;
    pointer-events: none;

    @media (max-width: 768px) {
      display: none;
    }
  `,

  leftColumn: css`
    display: flex;
    flex-direction: column;
    background: #fff;
    position: relative;
    height: 100vh;
    width: 40%;
    padding: 50px;
    z-index: 2;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,

  backButton: css`
    position: relative; /* ← Relative positioning */
    align-self: flex-start;
    margin-bottom: 20px;
    padding: 0;
    color: #5e6670;
    height: auto;
    border: none;
    background: transparent;
    font-size: 14px;
    z-index: 10;

    &:hover {
      color: #000;
      background: transparent;
    }

    @media (max-width: 1440px) {
      left: 10%;
    }

    @media (max-width: 768px) {
      top: 24px;
      left: 24px;
    }
  `,

  formWrapper: css`
    // position: absolute;
    // top: 200px;
    // left: 230px;
    width: 537px;
    max-height: calc(100vh - 200px - 100px);
    overflow-y: auto;
    padding-right: 10px;

    /* Scrollbar */
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 3px;
    }

    /* Responsive */
    @media (max-width: 1440px) {
      width: 450px;
      top: 150px;
      left: 10%;
    }

    @media (max-width: 1280px) {
      width: 420px;
      left: 8%;
    }

    @media (max-width: 1024px) {
      width: 90%;
      max-width: 500px;
      top: 120px;
      left: 5%;
    }

    @media (max-width: 768px) {
      position: relative;
      width: 100%;
      max-width: none;
      top: 0;
      left: 0;
      padding: 80px 24px 24px;
      max-height: none;
    }
  `,

  formContainer: css`
    width: 100%;
  `,

  logo: css`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 26px;
  `,

  logoText: css`
    color: #000;
    font-size: 24px;
    font-weight: 400;
    line-height: 24px;
    text-transform: capitalize;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  `,

  title: css`
    color: #18191c;
    font-size: 32px;
    font-weight: 500;
    line-height: 40px;
    margin-bottom: 8px !important;

    @media (max-width: 1024px) {
      font-size: 28px;
      line-height: 36px;
    }

    @media (max-width: 768px) {
      font-size: 24px;
      line-height: 32px;
    }
  `,

  subtitle: css`
    color: #5e6670;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    margin-bottom: 16px;
    display: block;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  `,

  form: css`
    width: 100%;
  `,

  formItem: css`
    margin-bottom: 10px;
    width: 100%;

    .ant-form-item-explain-error {
      font-size: 13px;
      margin-top: 4px;
      color: #ff4d4f;
    }

    @media (max-width: 768px) {
      margin-bottom: 16px;
    }
  `,

  input: css`
    width: 100%;
    height: 48px;
    padding: 12px 18px;
    border-radius: 5px;
    border: 1px solid #e4e5e8;
    background: #fff;
    font-size: 16px;
    color: #18191c;
    line-height: 24px;

    &::placeholder {
      color: #767f8c;
      font-size: 16px;
      line-height: 24px;
    }

    &:hover {
      border-color: #d1d5db;
    }

    &:focus,
    &.ant-input-focused {
      border-color: #18191c;
      box-shadow: none;
    }

    @media (max-width: 768px) {
      height: 44px;
      font-size: 15px;
    }
  `,

  passwordInput: css`
    width: 100%;
    height: 48px;
    border-radius: 5px;
    border: 1px solid #e4e5e8;
    background: #fff;
    padding: 0 18px;

    .ant-input {
      padding: 12px 18px;
      font-size: 16px;
      color: #18191c;
      background: transparent;
      line-height: 24px;

      &::placeholder {
        color: #767f8c;
        font-size: 16px;
        line-height: 24px;
      }
    }

    .ant-input-suffix {
      color: #767f8c;

      .anticon {
        font-size: 20px;
      }
    }

    &:hover {
      border-color: #d1d5db;
    }

    &:focus,
    &.ant-input-affix-wrapper-focused {
      border-color: #18191c;
      box-shadow: none;
    }

    .ant-input-suffix {
      color: #767f8c;
    }

    @media (max-width: 768px) {
      height: 44px;

      .ant-input {
        font-size: 15px;
      }
    }
  `,

  checkbox: css`
    font-size: 14px;
    color: #767f8c;
    line-height: 20px;
    width: 100%;

    .ant-checkbox {
      .ant-checkbox-inner {
        width: 20px;
        height: 20px;
        border-radius: 3px;
        border: 1px solid #5b6775;
      }
    }

    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #18191c;
      border-color: #18191c;
    }

    a {
      color: #18191c;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      font-size: 13px;
    }
  `,

  submitButton: css`
    width: 100%;
    height: 48px;
    padding: 16px 32px;
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.2) 100%
      ),
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-top: 5px;
    color: #fff;
    font-family: Manrope;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */

    &:hover {
      background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.3) 0%,
          rgba(0, 0, 0, 0.3) 100%
        ),
    }

    &:active {
      transform: translateY(0);
    }

    svg {
      transform: translateY(2.6px);
      width: 20px;
      height: 20px;
    }

    @media (max-width: 768px) {
      height: 44px;
      font-size: 15px;
      padding: 0 24px;
    }
  `,

  divider: css`
    margin: 16px 0;
    color: #767f8c;
    font-size: 14px;

    .ant-divider-inner-text {
      color: #767f8c;
      font-size: 14px;
    }

    @media (max-width: 768px) {
      margin: 12px 0;
      font-size: 13px;
    }
  `,

  socialButtonsWrapper: css`
    display: flex;
    gap: 20px;
    width: 100%;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 12px;
    }
  `,

  socialButton: css`
    display: flex;
    width: 258px;
    height: 44px;
    padding: 12px 24px;
    justify-content: center;
    align-items: center;
    gap: 12px;

    color: var(--Gray-700, #474c54);
    font-family: Manrope;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    gap: 12px;

    &:hover {
      border-color: #d1d5db;
    }

    .anticon {
      font-size: 20px;
    }

    @media (max-width: 768px) {
      height: 44px;
      font-size: 15px;
      padding: 12px 16px;

      .anticon {
        font-size: 18px;
      }
    }
  `,

  rightColumn: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    padding: 24px;
    text-align: center;
    position: relative;
    height: 100vh;
    width: 50%; /* ← Giữ 50% */
    overflow: hidden;

    @media (max-width: 768px) {
      display: none;
    }
  `,

  bgImage: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        180deg,
        rgba(13, 60, 4, 0.7),
        rgba(4, 60, 17, 0.7)
      ),
      url("/greenLogin.jpg") center/cover no-repeat;
    z-index: 0;
  `,

  contentWrapper: css`
    width: 100%;
    max-width: 800px; /* ← Giới hạn max width */
    position: relative;
    z-index: 2;
    padding-top: 450px;
    margin: 0 auto; /* ← Center content */

    @media (max-width: 1440px) {
      padding-top: 250px;
    }

    @media (max-width: 1024px) {
      padding-top: 200px;
    }
  `,

  titleWrapper: css`
    padding-left: 88px;
    margin-bottom: 50px;
    width: 100%;
    display: flex;

    @media (max-width: 1440px) {
      padding-left: 80px;
    }

    @media (max-width: 1024px) {
      padding-left: 60px;
      margin-bottom: 30px;
    }
  `,

  heroTitle: css`
    width: 560px;
    color: var(--Gray-Scale-White, #fff);
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: 48px;
    text-align: left;
    margin: 0;
    padding: 0;

    @media (max-width: 1440px) {
      font-size: 24px;
      max-width: 360px;
    }

    @media (max-width: 1024px) {
      font-size: 20px;
      max-width: 300px;
    }
  `,

  statsWrapper: css`
    width: 100%;
    display: flex;
    justify-content: flex-start;
  `,

  statsContainer: css`
    padding-left: 88px;
    max-width: 600px;
    width: 100%;
    display: flex;
    gap: 64px; /* ← Khoảng cách giữa các stat */
    align-items: flex-start;

    @media (max-width: 1440px) {
      padding-left: 80px;
    }

    @media (max-width: 1024px) {
      padding-left: 60px;
      max-width: 500px;
    }
  `,

  statCard: css`
    width: 72px;
    height: 72px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: linear-gradient(
      140deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
    box-shadow: 0 18px 32px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(10px);

    @media (max-width: 1024px) {
      width: 60px;
      height: 60px;
      border-radius: 18px;
      margin-bottom: 12px;
    }
  `,
  statItem: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  `,

  statNumber: css`
    color: #fff;
    font-size: 18px;
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
    line-height: 1.2;
    text-align: left;

    @media (max-width: 1024px) {
      font-size: 16px;
    }
  `,

  statLabel: css`
    color: #fff;
    font-size: 14px;
    font-weight: 400;
    opacity: 0.7;
    text-align: left;

    @media (max-width: 1024px) {
      font-size: 12px;
    }
  `,
}));

export default function LoginForm() {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const { styles } = useStyles();
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { message } = App.useApp();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      setApiError(null);
      setLoginSuccess(false);
      setIsSubmitting(true);

      await login(values.email, values.password);

      setLoginSuccess(true);
      message.success("Đăng nhập thành công! Chào mừng bạn trở lại.");

      // Redirect sau một khoảng ngắn
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);

      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();

        // Xử lý các loại lỗi cụ thể
        if (
          errorMessage.includes("account is deactivated") ||
          errorMessage.includes("deactivated")
        ) {
          setApiError(
            "Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng liên hệ quản trị viên."
          );
        } else if (
          errorMessage.includes("locked") ||
          errorMessage.includes("temporarily locked")
        ) {
          setApiError(
            "Tài khoản của bạn tạm thời bị khóa. Vui lòng thử lại sau."
          );
        } else if (
          errorMessage.includes("invalid credentials") ||
          errorMessage.includes("incorrect password") ||
          errorMessage.includes("user not found")
        ) {
          setApiError("Tên đăng nhập hoặc mật khẩu không đúng.");
        } else {
          // Hiển thị thông báo lỗi từ server
          setApiError(error.message);
        }
      } else {
        setApiError("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFinish = (values: Record<string, unknown>) => {
    handleSubmit(values as any);
  };

  return (
    <div className={styles.container}>
      <Row className={styles.row}>
        <div className={styles.diagonalDivider} />

        {/* LEFT COLUMN */}
        <Col span={12} className={styles.leftColumn}>
          <div className={styles.formWrapper}>
            <Button
              type="text"
              icon={<ChevronLeft />}
              className={styles.backButton}
              onClick={() => router.push("/")}
            >
              Back to home
            </Button>
            <div className={styles.formContainer}>
              {/* Logo */}
              <div className={styles.logo}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="24"
                  viewBox="0 0 40 24"
                  fill="none"
                >
                  <path
                    d="M12.042 10V23H0.5V10H12.042Z"
                    fill="black"
                    stroke="black"
                  />
                  <path
                    d="M29.7648 16.2664L29.5861 16.1169L21.2247 9.11694L21.0851 8.99976H13.0421V0.666748H24.8829L39.2169 14.3796V22.9998H29.7648V16.2664Z"
                    fill="black"
                    stroke="black"
                  />
                </svg>
                <span className={styles.logoText}>RecruitJob</span>
              </div>

              <Title level={2} className={styles.title}>
                Sign in.
              </Title>
              <Text className={styles.subtitle}>
                Don’t have account? {""}
                <Link
                  href="/register"
                  style={{ fontWeight: 500, color: "#18191c" }}
                >
                  Create Account
                </Link>
              </Text>

              {/* Alert Báo Lỗi */}
              {apiError && (
                <Alert
                  message={apiError}
                  type="error"
                  showIcon
                  closable
                  onClose={() => setApiError(null)}
                  style={{ marginBottom: 16 }}
                />
              )}

              {/* Alert thành công */}
              {loginSuccess && (
                <Alert
                  message="Đăng nhập thành công! Đang chuyển hướng..."
                  type="success"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
              )}

              <Form
                form={form}
                layout="vertical"
                className={styles.form}
                onFinish={onFinish}
                requiredMark={false}
              >
                <Form.Item name="email" className={styles.formItem}  rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}>
                  <Input
                    placeholder="Email address"
                    type="email"
                    data-testid="email-input"
                    className={styles.input}
                  />
                </Form.Item>

                

                <Form.Item name="password" className={styles.formItem} rules={[
                  { required: true, message: "Please enter your password!" },
                  { min: 6, message: "Password must be at least 6 characters!" },
                ]}>
                  <Input.Password
                    placeholder="Password"
                    className={styles.passwordInput}
                    data-testid="password-input"
                    iconRender={(visible) =>
                      visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="agree"
                  valuePropName="checked"
                  className={styles.formItem}
                >
                  <Link
                    href="/register"
                    style={{ fontWeight: 200, color: "#696969ff" }}
                  >
                    Forgot Password?
                  </Link>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={isSubmitting}
                    className={styles.submitButton}
                    icon={<ArrowRight />}
                    iconPosition="end"
                  >
                    Sign In
                  </Button>
                </Form.Item>

                <Divider className={styles.divider}>or</Divider>

                <div className={styles.socialButtonsWrapper}>
                  <Button
                    icon={<FacebookIcon width={20} height={20} />}
                    className={styles.socialButton}
                  >
                    Sign up with Facebook
                  </Button>
                  <Button
                    icon={<GoogleIcon width={20} height={20} />}
                    className={styles.socialButton}
                  >
                    Sign up with Google
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Col>

        {/* RIGHT COLUMN */}
        <Col span={12} className={styles.rightColumn}>
          <div className={styles.bgImage} />
          <div className={styles.contentWrapper}>
            <div className={styles.titleWrapper}>
              <div className={styles.heroTitle}>
                Over 1,75,324 candidates
                <br />
                waiting for good employees.
              </div>
            </div>
            <div className={styles.statsWrapper}>
              <div className={styles.statsContainer}>
                {STATS_DATA.map((stat, index) => (
                  <div key={index} className={styles.statItem}>
                    <div className={styles.statCard}>{statsIcons[index]}</div>
                    <Text className={styles.statNumber}>{stat.number}</Text>
                    <Text className={styles.statLabel}>{stat.label}</Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
