import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const TalkManagement: React.FC = () => {
    return (
        <div className={"border "}>
            <div className={"flex-col items-center"}>
                <h1 className="text-3xl font-bold underline text-center mb-5">Demandes de talks</h1>
                <Card sx={{minWidth: 275, marginBottom: 3}}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            TALK 1
                        </Typography>
                        <Typography sx={{color: 'text.secondary', mb: 1.5}}>Sujet 1</Typography>
                        <Typography variant="body2">
                            12/02/2025
                            <br/>
                            14:30 - 15:00
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{minWidth: 275, marginBottom: 3}}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            TALK 1
                        </Typography>
                        <Typography sx={{color: 'text.secondary', mb: 1.5}}>Sujet 1</Typography>
                        <Typography variant="body2">
                            12/02/2025
                            <br/>
                            14:30 - 15:00
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TalkManagement;