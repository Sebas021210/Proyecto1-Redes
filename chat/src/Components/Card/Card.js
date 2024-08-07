import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function ChatCard(props) {
    return (
        <Card >
            <CardContent>
                <Typography variant="h6" component="div">
                    {props.name}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                    {props.status}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ChatCard;
