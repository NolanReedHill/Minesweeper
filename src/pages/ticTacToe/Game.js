import React, { useState } from "react";
import TicTacToe from './TicTacToe';
import { Window, MessageList, MessageInput } from "stream-chat-react";
import { Button, Dialog, DialogActions, DialogTitle, DialogContent } from "@mui/material";
import './TicTacToe.css';

function Game({ channel, setChannel }) {

    const [playersJoined, setPlayersJoined] = useState(
        channel.state.watcher_count === 2
    );
    const [isOpen, setIsOpen] = useState(false);

    channel.on("user.watching.start", (event) => {
        setPlayersJoined(event.watcher_count === 2);
    });
    if (!playersJoined) {
        return (
            <>
                <h1> Waiting for other player to join...</h1>
                <div className="spinner" style={{ margin: "auto" }} />
            </>
        );

    }

    async function leaveGame() {
        await channel.stopWatching();
        setChannel(null);
    }

    return (
        <>
            <TicTacToe />
            <div className="chatContainer">
                <Window>
                    <MessageList
                        disableDateSeparator
                        closeReactionSelectorOnClick
                        hideDeletedMessages
                        messageActions={["react"]}
                    />
                    <MessageInput noFiles />
                </Window>
                <Button
                    className="leaveButton"
                    onClick={() => setIsOpen(true)}
                    variant="contained"
                    size="small"
                    color="error"
                    sx={{ marginLeft: "10px", marginTop: "4%" }}
                >
                    {" "}
                    Leave Game
                </Button>
            </div>
            <Dialog open={isOpen}
                onClose={() => setIsOpen(false)}>
                <DialogTitle>
                    Leave This Game?
                </DialogTitle>
                <DialogContent>
                    You can rejoin as long as your opponent hasn't disconnected.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setIsOpen(false);
                        leaveGame();
                    }}
                        color="error">
                        Confirm</Button>
                    <Button onClick={() => setIsOpen(false)}>Go Back</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Game;