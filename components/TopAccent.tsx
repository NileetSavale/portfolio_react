export default function TopAccent() {
  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[3px] z-[70]"
      style={{ background: 'linear-gradient(90deg,transparent,#ff7a2f,#f4c430,#c0001a,#7b3ff2,#f4c430,transparent)', opacity: .85 }}
    />
  )
}
