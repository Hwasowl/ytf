// components/NewsCard.js
import React from 'react';
import {Card, CardContent, CardMedia, Typography, Box, Chip, Button, CardActionArea} from '@mui/material';
import { styled } from '@mui/system';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { format } from 'date-fns';

const StyledCard = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
        zIndex: 1,
    },
});

const StyledCardMedia = styled(CardMedia)({
    paddingTop: '56.25%', // 16:9 aspect ratio
});

const ContentWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
});

const StyledCardContent = styled(CardContent)({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
});

const TitleTypography = styled(Typography)({
    flexGrow: 0,
});

const ContentTypography = styled(Typography)({
    flexGrow: 1,
});

const NewsCard = ({ item, onSummaryClick }) => (
    <StyledCard>
        <StyledCardMedia
            image={item.thumbnailUrl || 'https://source.unsplash.com/random?news'}
            title={item.title}
        />
        <ContentWrapper>
            <StyledCardContent>
            <CardActionArea href={item.newsUrl} target="_blank" rel="noopener noreferrer">
                <TitleTypography gutterBottom variant="h6" component="div">
                    {item.title}
                </TitleTypography>
                <ContentTypography variant="body2" color="text.secondary">
                    {item.content.length > 100 ? `${item.content.substring(0, 100)}...` : item.content}
                </ContentTypography>
            </CardActionArea>
            </StyledCardContent>
            <Box sx={{ p: 2, pt: 0 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Chip label={item.tag} size="small" color="primary" />
                    <Typography variant="caption" color="text.secondary">
                        {format(new Date(item.publishedAt), 'yyyy-MM-dd')}
                    </Typography>
                </Box>
                <Button
                    startIcon={<AutoAwesomeIcon />}
                    onClick={() => onSummaryClick(item)}
                    fullWidth
                    variant="outlined"
                >
                    AI 요약
                </Button>
            </Box>
        </ContentWrapper>
    </StyledCard>
);

export default NewsCard;
