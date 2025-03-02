interface TimeAgoProps {
  timestamp: number;
}

const TimeAgo = ({ timestamp }: TimeAgoProps) => {
  const timeAgo = getTimeAgo(timestamp);
  return <span>{timeAgo}</span>;
};

function getTimeAgo(timestamp: number): string {
  const now = Date.now();
  const secondsAgo = Math.floor((now - timestamp) / 1000);
  
  if (secondsAgo < 60) {
    return 'just now';
  }
  
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) {
    return `${minutesAgo}m ago`;
  }
  
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) {
    return `${hoursAgo}h ago`;
  }
  
  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 7) {
    return `${daysAgo}d ago`;
  }
  
  const date = new Date(timestamp);
  return date.toLocaleDateString();
}

export default TimeAgo;
