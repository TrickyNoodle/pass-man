"use client"

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* gradient */}
      <div className="
        absolute inset-0
        bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600
        bg-[length:300%_300%]
        animate-[gradient_15s_ease_infinite]
        opacity-80
      " />

      {/* blobs */}
      <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] bg-purple-500 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute top-1/3 right-0 w-[28rem] h-[28rem] bg-pink-500 rounded-full blur-3xl opacity-40 animate-pulse delay-1000" />
      <div className="absolute bottom-0 left-1/4 w-[26rem] h-[26rem] bg-blue-500 rounded-full blur-3xl opacity-40 animate-pulse delay-2000" />
    </div>
  )
}
