import { useState, useEffect, useRef } from "react";
import { Okay } from "./Okay";
import { Map } from "./Map";
// import Swal from "sweetalert2";

type MainPageParam = {
    ws: WebSocket;
};

export type Rooms = Room[];
export type Room = {
    is_safe: boolean;
    error: boolean;
    room_id: number;
};

export type WsMessage = {
    rooms: Rooms;
};

export type RoomState = {
    r1: Room | false;
    r2: Room | false;
    r3: Room | false;
    r4: Room | false;
};

export const MainPage: React.FC<MainPageParam> = ({ ws }) => {
    const [safe, setSafe] = useState<boolean>(true);

    const [roomStatus, setRoomStatus] = useState<RoomState>({
        r1: false,
        r2: false,
        r3: false,
        r4: false
    });


    const roomStatusRef = useRef<RoomState>({
        r1: false,
        r2: false,
        r3: false,
        r4: false
    });

    useEffect(() => {
        const handleMessage = (e: MessageEvent) => {
            console.log(e.data);
            if (e.data === "off") {
                setSafe(true);
            } else {
                try {
                    
                    if (e.data == "on") {
                        setSafe(false)
                       return; 
                    }
                    
                    const message: WsMessage = JSON.parse(e.data);

                    const newRoomStatus = { ...roomStatusRef.current };

                    message.rooms.forEach((room) => {
                        newRoomStatus[`r${room.room_id}` as keyof RoomState] = room;
                    });

                    roomStatusRef.current = newRoomStatus;
                    setRoomStatus(newRoomStatus);

                    setSafe(false);
                } catch (error) {
                    // Swal.fire({
                    //     icon: "question",
                    //     title: "Unaccepted message type",
                    //     text: "Did you enter the correct WebSocket address?"
                    // });
                    
                    console.error("Error parsing WebSocket message:", error);
                }
            }
        };

        ws.addEventListener("message", handleMessage);

        return () => {
            ws.removeEventListener("message", handleMessage);
        };
    }, [ws]);
    // return <Map rooms={roomStatus} />
    return safe ? <Okay /> : <Map rooms={roomStatus} />;
};


