export default function Card ( {borderColor,title,items} ) {
    return (
        <div className={`w-56 h-fit py-3 rounded-tl-2xl rounded-bl-2xl shadow-md border border-t-2 border-b-2 border-l-2 px-3 space-y-1 border-r-[10px] ${borderColor}`}>
            <h2 className="font-semibold text-2xl">{title}</h2>
            <p className="text-xl">{items}</p>
        </div>
    )
}