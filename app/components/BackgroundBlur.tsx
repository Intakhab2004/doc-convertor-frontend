

export default function Orb({ style }: {style: string}) {
    return (
        <div className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${style}`}
        />
    )
}