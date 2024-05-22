export interface UserInit{
    id: number
    username: string
    room: string
}

export interface StatusInit{
    status: boolean
    error: string
    user: {
        room : string
        username : string
    }
}