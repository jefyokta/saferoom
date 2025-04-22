import { RoomState, Room } from "./MainPage";

type MapParams = {
    rooms: RoomState;
};

export const Map: React.FC<MapParams> = ({ rooms }) => {
    const getStatusColor = (room: Room | false): string => {
        if (room === false) return "bg-gray-400"; 
        if (room.error) return "bg-orange-500"; 
        return room.is_safe ? "bg-green-500" : "bg-red-500"; 
    };

    const getStatusAnimation = (room: Room | false): string => {
        if (room !== false && !room.is_safe) return "animate-pulse";
        return "";
    };

    return (
        <div className="p-10">
            <div className="bg-white shadow rounded-md border-gray-400 p-6 aspect-square max-w-3xl mx-auto relative">
                <div className="flex w-full justify-center">

                    <div className="absolute w-10/12 m-auto h-16 bg-gray-900"></div>
                </div>


                <div className="grid grid-cols-2 gap-12 mt-32">
                    <div className="relative">
                        <div className="aspect-square  bg-gray-900 w-full"></div>
                        <div
                            className={`absolute text-center -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full ${getStatusColor(rooms.r1)} ${getStatusAnimation(rooms.r1)}`}
                            title={rooms.r1 ? `Room 1: ${rooms.r1.is_safe ? 'Safe' : 'Alert'}${rooms.r1.error ? ' (Error)' : ''}` : 'No data'}
                        >1</div>
                    </div>

                    <div className="relative">
                        <div className="aspect-square bg-gray-900 w-full"></div>
                        <div
                            className={`absolute text-center -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full ${getStatusColor(rooms.r4)} ${getStatusAnimation(rooms.r4)}`}
                            title={rooms.r4 ? `Room 2: ${rooms.r4.is_safe ? 'Safe' : 'Alert'}${rooms.r4.error ? ' (Error)' : ''}` : 'No data'}
                        >4</div>
                    </div>

                    <div className="relative mt-12">
                        <div className="aspect-square bg-gray-900 flex justify-center items-center relative w-full">
                            <div className="fire-container">
                                <div className="flames-wrapper">
                                    <div className="flame bottom-20 flame-red"></div>
                                    <div className="flame bottom-20 flame-orange"></div>
                                    <div className="flame bottom-20 flame-yellow"></div>
                                    <div className="flame bottom-20 flame-blue"></div>
                                    <div className="flame bottom-20 flame-core"></div>
                                    <div className="ember"></div>
                                    <div className="ember"></div>
                                    <div className="ember"></div>
                                    <div className="ember"></div>
                                    <div className="ember"></div>
                                </div>
                                <div className="absolute bottom-10 opacity-70 blur-[.5px] text-center text-yellow-300">Fire Point</div>
                            </div>
                        </div>
                        <div
                            className={`absolute text-center -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full ${getStatusColor(rooms.r2)} ${getStatusAnimation(rooms.r2)}`}
                            title={rooms.r2 ? `Room 3: ${rooms.r2.is_safe ? 'Safe' : 'Alert'}${rooms.r2.error ? ' (Error)' : ''}` : 'No data'}
                        >2</div>
                    </div>

                    <div className="relative mt-12">
                        <div className="aspect-square bg-gray-900 w-full"></div>
                        <div
                            className={`absolute text-center -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full ${getStatusColor(rooms.r3)} ${getStatusAnimation(rooms.r3)}`}
                            title={rooms.r3 ? `Room 4: ${rooms.r3.is_safe ? 'Safe' : 'Alert'}${rooms.r3.error ? ' (Error)' : ''}` : 'No data'}
                        >3</div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Safe</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">Alert</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
                    <span className="text-sm">Error</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-gray-400 mr-2"></div>
                    <span className="text-sm">No Data</span>
                </div>
            </div>
        </div>
    );
};