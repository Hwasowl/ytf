// components/NewsTimeline.js
import React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Typography, Paper } from '@mui/material';

const NewsTimeline = ({ news }) => {
    return (
        <Timeline position="alternate">
            {news.map((item, index) => (
                <TimelineItem key={item.id}>
                    <TimelineSeparator>
                        <TimelineDot color="primary" />
                        {index !== news.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                        <Paper elevation={3} sx={{ p: 2, bgcolor: 'background.paper' }}>
                            <Typography variant="h6" component="h1">
                                {item.title}
                            </Typography>
                            <Typography>{item.content.substring(0, 100)}...</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {new Date(item.publishedAt).toLocaleString()}
                            </Typography>
                        </Paper>
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
};

export default NewsTimeline;
