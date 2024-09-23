import React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import NewsCard from './NewsCard';

const NewsTimeline = ({ news, isMember, onSummaryClick }) => {
    return (
        <Timeline position="alternate">
            {news.map((item, index) => (
                <TimelineItem key={item.id}>
                    <TimelineSeparator>
                        <TimelineDot color="primary" />
                        {index !== news.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                        <NewsCard item={item} onSummaryClick={onSummaryClick} isMember={isMember} />
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
};

export default NewsTimeline;