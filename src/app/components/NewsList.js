// components/NewsList.js
import React, { useState } from 'react';
import { Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import NewsCard from './NewsCard';

const NewsList = ({ news }) => {
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
            <Grid container spacing={2}>
                {news.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <NewsCard item={item} onSummaryClick={handleOpenSummary} />
                    </Grid>
                ))}
            </Grid>
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

export default NewsList;
