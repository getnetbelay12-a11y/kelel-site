export function AiMotionStage() {
  return (
    <div className="ai-motion-stage" aria-hidden="true">
      <span className="ai-motion-beam ai-motion-beam--left" />
      <span className="ai-motion-beam ai-motion-beam--right" />
      <span className="ai-motion-edge-node ai-motion-edge-node--left" />
      <span className="ai-motion-edge-node ai-motion-edge-node--right" />
      <div className="ai-motion-field">
        <span className="ai-motion-message ai-motion-message--one">Signal captured</span>
        <span className="ai-motion-message ai-motion-message--two">AI routing</span>
        <span className="ai-motion-message ai-motion-message--three">Decision ready</span>
        <span className="ai-motion-message ai-motion-message--four">Operations synced</span>
        <span className="ai-motion-ring ai-motion-ring--one" />
        <span className="ai-motion-ring ai-motion-ring--two" />
        <span className="ai-motion-ring ai-motion-ring--three" />
        <span className="ai-motion-core" />
        <span className="ai-motion-node ai-motion-node--one" />
        <span className="ai-motion-node ai-motion-node--two" />
        <span className="ai-motion-node ai-motion-node--three" />
        <span className="ai-motion-node ai-motion-node--four" />
        <span className="ai-motion-arc ai-motion-arc--one" />
        <span className="ai-motion-arc ai-motion-arc--two" />
        <span className="ai-motion-arc ai-motion-arc--three" />
      </div>
      <p className="ai-motion-caption">
        One operational signal expands into intelligence, decisions, and coordinated execution.
      </p>
    </div>
  )
}
