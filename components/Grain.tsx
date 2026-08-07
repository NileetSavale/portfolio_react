const NOISE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E"

export default function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[90]"
      style={{
        inset: '-50%', width: '200%', height: '200%',
        opacity: .065,
        backgroundImage: `url("${NOISE}")`,
        animation: 'grain 8s steps(10) infinite',
      }}
    />
  )
}
