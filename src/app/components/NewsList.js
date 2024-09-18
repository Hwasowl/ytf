// components/NewsList.js
import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
        zIndex: 1,
    },
});

const StyledCardMedia = styled(CardMedia)({
    paddingTop: '56.25%', // 16:9 aspect ratio
});

const NewsList = ({ news }) => {
    return (
        <Grid container spacing={2}>
            {news.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <StyledCard onClick={() => window.open(item.newsUrl, '_blank')}>
                        <StyledCardMedia
                            image={item.thumbnailUrl || 'https://source.unsplash.com/random?news'}
                            title={item.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {item.content.length > 100 ? `${item.content.substring(0, 100)}...` : item.content}
                            </Typography>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="caption" color="primary">
                                    {item.tag}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {new Date(item.publishedAt).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </CardContent>
                    </StyledCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default NewsList;
