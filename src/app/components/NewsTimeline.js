// components/NewsTimeline.js
import React, { useState } from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import NewsCard from './NewsCard';

const NewsTimeline = ({ news }) => {
    const [openSummary, setOpenSummary] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);

    const handleOpenSummary = (newsItem) => {
        setSelectedNews(newsItem);
        setOpenSummary(true);
    };

    const handleCloseSummary = () => {
        setOpenSummary(false);
    };

    return (
        <>
            <Timeline position="alternate">
                {news.map((item, index) => (
                    <TimelineItem key={item.id}>
                        <TimelineSeparator>
                            <TimelineDot color="primary" />
                            {index !== news.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                            <NewsCard item={item} onSummaryClick={handleOpenSummary} />
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
            <Dialog open={openSummary} onClose={handleCloseSummary}>
                <DialogTitle>AI 요약</DialogTitle>
                <DialogContent>
                    <Typography>
                        {selectedNews?.aiContent}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSummary}>닫기</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default NewsTimeline;
