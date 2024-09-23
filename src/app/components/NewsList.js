import React from 'react';
import { Grid } from '@mui/material';
import NewsCard from './NewsCard';

const NewsList = ({ news, isMember, onSummaryClick }) => {
    return (
        <Grid container spacing={2}>
            {news.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <NewsCard item={item} onSummaryClick={onSummaryClick} isMember={isMember} />
                </Grid>
            ))}
        </Grid>
    );
};

export default NewsList;