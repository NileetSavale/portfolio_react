import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt     = 'Nileet Savale — AI/ML Engineer'
export const size    = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          background: '#060809',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* top-left accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: 'linear-gradient(90deg, #c0001a, #f4c430, transparent)',
          display: 'flex',
        }} />

        {/* faint grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(244,196,48,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(244,196,48,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          display: 'flex',
        }} />

        {/* eyebrow */}
        <div style={{
          fontSize: 14, letterSpacing: '0.4em', textTransform: 'uppercase',
          color: 'rgba(244,196,48,0.7)', marginBottom: 20, display: 'flex',
        }}>
          Portfolio · www.nileetsavale.com
        </div>

        {/* name */}
        <div style={{
          fontSize: 88, fontWeight: 900, color: '#efe8da',
          lineHeight: 0.9, letterSpacing: '-0.02em', display: 'flex',
        }}>
          Nileet Savale
        </div>

        {/* title */}
        <div style={{
          fontSize: 28, color: 'rgba(239,232,218,0.5)',
          marginTop: 28, letterSpacing: '0.06em', display: 'flex',
        }}>
          AI / ML Engineer · Indiana University
        </div>

        {/* bottom rule */}
        <div style={{
          position: 'absolute', bottom: 72, right: 80,
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6,
        }}>
          <div style={{ width: 48, height: 1, background: 'rgba(244,196,48,0.4)', display: 'flex' }} />
          <div style={{ fontSize: 12, letterSpacing: '0.3em', color: 'rgba(239,232,218,0.25)', textTransform: 'uppercase', display: 'flex' }}>
            CS Graduate Student
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
