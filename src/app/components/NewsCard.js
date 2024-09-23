import React, { useState } from 'react';
import {Card, CardContent, CardMedia, Typography, Box, Chip, Button, CardActionArea, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress} from '@mui/material';
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

const NewsCard = ({ item, onSummaryClick, isMember }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [summaryLoading, setSummaryLoading] = useState(false);
    const [summary, setSummary] = useState('');

    const handleSummaryClick = async () => {
        if (isMember) {
            setSummaryLoading(true);
            setOpenDialog(true);
            try {
                const summaryResult = await onSummaryClick(item);
                setSummary(summaryResult);
            } catch (error) {
                console.error("Error fetching summary:", error);
                setSummary("요약을 불러오는데 실패했습니다.");
            } finally {
                setSummaryLoading(false);
            }
        } else {
            setOpenDialog(true);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSummary('');
    };

    const dialogContent = () => {
        if (!isMember) {
            return (
                <>
                    <DialogTitle>멤버십 가입 안내</DialogTitle>
                    <DialogContent>
                        <Typography>AI 요약 기능은 멤버십 회원만 이용할 수 있습니다. 지금 가입하시겠습니까?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>취소</Button>
                        <Button onClick={() => window.location.href = '/payment/method'} color="primary">
                            멤버십 가입하기
                        </Button>
                    </DialogActions>
                </>
            );
        } else if (summaryLoading) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
                    <CircularProgress />
                </Box>
            );
        } else {
            return (
                <>
                    <DialogTitle>AI 요약</DialogTitle>
                    <DialogContent>
                        <Typography>{summary}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>닫기</Button>
                    </DialogActions>
                </>
            );
        }
    };

    return (
        <>
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
                            onClick={handleSummaryClick}
                            fullWidth
                            variant="outlined"
                        >
                            AI 요약
                        </Button>
                    </Box>
                </ContentWrapper>
            </StyledCard>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                {dialogContent()}
            </Dialog>
        </>
    );
};

export default NewsCard;