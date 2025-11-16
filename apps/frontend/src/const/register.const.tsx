import React from "react";
export const REGISTER_VALIDATION_CONFIG = {
  username: {
    min: 3,
    max: 30,
    pattern: /^[a-zA-Z0-9._]+$/,
    reserved: ["admin", "root"],
  },
  password: {
    min: 8,
    patterns: {
      lowercase: /(?=.*[a-z])/,
      uppercase: /(?=.*[A-Z])/,
      digit: /(?=.*\d)/,
      special: /(?=.*[!@#$%^&*()_+\-=[\]{}|;:,.<>?])/,
    },
  },
} as const;

export const STATS_DATA = [
  { number: "1,75,324", label: "Live Job" },
  { number: "97,354", label: "Companies" },
  { number: "7,532", label: "New Jobs" },
] as const;

export const statsIcons = [
  // Icon 1: Briefcase (Live Job)
  <svg
    key="briefcase"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <g clipPath="url(#clip0_briefcase)">
      <path
        opacity="0.2"
        d="M16 18.9999C11.7872 19.0066 7.64764 17.8991 4.00098 15.7897V25.9999C4.00098 26.1313 4.02684 26.2613 4.0771 26.3826C4.12735 26.504 4.20101 26.6142 4.29387 26.7071C4.38673 26.7999 4.49697 26.8736 4.61829 26.9238C4.73962 26.9741 4.86965 26.9999 5.00098 26.9999H27.001C27.1323 26.9999 27.2623 26.9741 27.3837 26.9238C27.505 26.8736 27.6152 26.7999 27.7081 26.7071C27.8009 26.6142 27.8746 26.504 27.9249 26.3826C27.9751 26.2613 28.001 26.1313 28.001 25.9999V15.7886C24.3539 17.8987 20.2135 19.0066 16 18.9999Z"
        fill="white"
      />
      <path
        d="M27.001 9H5.00098C4.44869 9 4.00098 9.44772 4.00098 10V26C4.00098 26.5523 4.44869 27 5.00098 27H27.001C27.5533 27 28.001 26.5523 28.001 26V10C28.001 9.44772 27.5533 9 27.001 9Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 9V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H13C12.4696 5 11.9609 5.21071 11.5858 5.58579C11.2107 5.96086 11 6.46957 11 7V9"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.001 15.7886C24.3539 17.8986 20.2136 19.0066 16 18.9999C11.7872 19.0066 7.64755 17.899 4.00085 15.7896"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 15H17.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_briefcase">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>,

  // Icon 2: Building (Companies)
  <svg
    key="building"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <g clipPath="url(#clip0_building)">
      <path
        opacity="0.2"
        d="M17.9993 26.9978V4.9978C17.9993 4.73259 17.8939 4.47823 17.7064 4.2907C17.5188 4.10316 17.2645 3.9978 16.9993 3.9978H4.99927C4.73405 3.9978 4.4797 4.10316 4.29216 4.2907C4.10462 4.47823 3.99927 4.73259 3.99927 4.9978V26.9978"
        fill="white"
      />
      <path
        d="M2 26.9978H30"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.9993 26.9978V4.9978C17.9993 4.73259 17.8939 4.47823 17.7064 4.2907C17.5188 4.10316 17.2645 3.9978 16.9993 3.9978H4.99927C4.73405 3.9978 4.4797 4.10316 4.29216 4.2907C4.10462 4.47823 3.99927 4.73259 3.99927 4.9978V26.9978"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.9993 26.9978V12.9978C27.9993 12.7326 27.8939 12.4782 27.7064 12.2907C27.5188 12.1032 27.2645 11.9978 26.9993 11.9978H17.9993"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99927 8.9978H11.9993"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99927 16.9978H13.9993"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99927 21.9978H11.9993"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.9993 21.9978H23.9993"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.9993 16.9978H23.9993"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_building">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>,

  // Icon 3: Document (New Jobs)
  <svg
    key="document"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <g clipPath="url(#clip0_document)">
      <path
        opacity="0.2"
        d="M20 3H8C7.46957 3 6.96086 3.21071 6.58579 3.58579C6.21071 3.96086 6 4.46957 6 5V27C6 27.5304 6.21071 28.0391 6.58579 28.4142C6.96086 28.7893 7.46957 29 8 29H24C24.5304 29 25.0391 28.7893 25.4142 28.4142C25.7893 28.0391 26 27.5304 26 27V9L20 3Z"
        fill="white"
      />
      <path
        d="M20 3H8C7.46957 3 6.96086 3.21071 6.58579 3.58579C6.21071 3.96086 6 4.46957 6 5V27C6 27.5304 6.21071 28.0391 6.58579 28.4142C6.96086 28.7893 7.46957 29 8 29H24C24.5304 29 25.0391 28.7893 25.4142 28.4142C25.7893 28.0391 26 27.5304 26 27V9L20 3Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 3V9H26"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 17H13"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 22H13"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 12H14H13"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_document">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>,
];
