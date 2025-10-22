import type { AppProps } from "next/app";
import "../styles/chat.css"; // 전역 CSS는 여기서만 import

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}