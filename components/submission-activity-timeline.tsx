import type { SubmissionActivity } from "@/lib/contact-submissions";

type SubmissionActivityTimelineProps = {
  history: SubmissionActivity[];
};

export function SubmissionActivityTimeline({
  history,
}: SubmissionActivityTimelineProps) {
  return (
    <div className="activity-timeline">
      <span className="timeline-label">Activity history</span>
      <div className="activity-list">
        {history.map((item, index) => (
          <article key={`${item.createdAt}-${index}`} className="activity-item">
            <strong>{item.message}</strong>
            {item.actor ? (
              <span className="activity-actor">
                {item.actor.name} ({item.actor.role})
              </span>
            ) : null}
            <span>{new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(item.createdAt))}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
