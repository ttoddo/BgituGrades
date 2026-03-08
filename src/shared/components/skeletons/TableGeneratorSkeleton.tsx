


interface PropsInterface{
    className?: string
}




export default function TableGeneratorSkeleton({className = "bg-bgModal animate-bounce dark:bg-bgLightD border-bgModal w-full h-142.5 rounded-lg"}: PropsInterface){
    return (
        <div className={className}></div>
    );
}