// components/NewsList.js
import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Box, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/system';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

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
                        <StyledCard>
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
                                    <Chip label={item.tag} size="small" color="primary" />
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(item.publishedAt).toLocaleDateString()}
                                    </Typography>
                                </Box>
                                <Button
                                    startIcon={<AutoAwesomeIcon />}
                                    onClick={() => handleOpenSummary(item)}
                                    sx={{ mt: 2 }}
                                    fullWidth
                                    variant="outlined"
                                >
                                    AI 요약
                                </Button>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={openSummary} onClose={handleCloseSummary}>
                <DialogTitle>AI 요약</DialogTitle>
                <DialogContent>
                    <Typography>
                        {selectedNews?.aiContent.split(' ').slice(0, 20).join(' ')}
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
