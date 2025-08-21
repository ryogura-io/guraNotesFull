// _app.js
import '../styles/globals.css'
import '../styles/bootstrap.min.css'
import '../styles/bootstrap-icons.min.css'

import { StarsBackground } from "@/components/animate-ui/backgrounds/stars"

export default function App({ Component, pageProps }) {
  return (
    <div className="relative min-h-screen">
      {/* Background stars */}
      <StarsBackground
        pointerEvents={false}
        starColor="#fff"
        speed={50}
        factor={0.05}
        className="absolute inset-0 -z-10"
      />

      {/* All pages */}
      <Component {...pageProps} />
    </div>
  )
}
