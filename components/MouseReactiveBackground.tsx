"use client"

import { useEffect, useState } from "react"

export default function MouseReactiveBackground() {
    const [pos, setPos] = useState({ x: 50, y: 50 })

    useEffect(() => {
        if (window.innerWidth < 768) return

        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 100
            const y = (e.clientY / window.innerHeight) * 100
            setPos({ x, y })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050b08]">
            {/* base gradient */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-[#0a1f16] via-[#07140f] to-[#020806]"
                style={{
                    transform: `translate(${(pos.x - 50) * 0.15}px, ${(pos.y - 50) * 0.15}px)`
                }}
            />

            {/* green glow blob */}
            <div
                className="absolute w-[32rem] h-[32rem] bg-emerald-500/30 rounded-full blur-3xl transition-transform duration-300 ease-out"
                style={{
                    top: `${pos.y - 20}%`,
                    left: `${pos.x - 25}%`
                }}
            />

            {/* lime accent blob */}
            <div
                className="absolute w-[26rem] h-[26rem] bg-lime-400/20 rounded-full blur-3xl transition-transform duration-300 ease-out"
                style={{
                    top: `${60 - pos.y / 2}%`,
                    right: `${pos.x - 20}%`
                }}
            />

            {/* subtle depth blob */}
            <div
                className="absolute w-[24rem] h-[24rem] bg-green-700/20 rounded-full blur-3xl transition-transform duration-300 ease-out"
                style={{
                    bottom: `${pos.y - 30}%`,
                    left: `${60 - pos.x / 2}%`
                }}
            />
        </div>
    )
}
